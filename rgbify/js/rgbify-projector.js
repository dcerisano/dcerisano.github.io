const SERVICE_UUID     = "8bc01404-0000-4bf4-95d1-ce27a0477183";
const VOLUME_UUID      = "8bc01404-0004-4bf4-95d1-ce27a0477183";
const COLOR_UUID       = "8bc01404-0005-4bf4-95d1-ce27a0477183";
const PROJECTOR_UUID   = "8bc01404-0006-4bf4-95d1-ce27a0477183";
const TEXT_UUID        = "8bc01404-0007-4bf4-95d1-ce27a0477183";
const BRIDGE_UUID      = "8bc01404-0009-4bf4-95d1-ce27a0477183";
const SCREENSAVER_UUID = "8bc01404-0008-4bf4-95d1-ce27a0477183";
const TONE_UUID        = "8bc01404-000a-4bf4-95d1-ce27a0477183";
const DIS_UUID              = "0000180a-0000-1000-8000-00805f9b34fb";
const FIRMWARE_REV_UUID     = "00002a26-0000-1000-8000-00805f9b34fb";
const EXPECTED_FW_VERSION   = "0.1.6";
const TONE_OFFSET_MIN = -424;
const TONE_OFFSET_MAX = 1061;

let ambience = false;
const FPS = 30;
const RECONNECT_DELAY = 500;
const RECONNECT_MAX_DELAY = 5000;
// Whole-setup watchdog: on Chrome/Linux, a GATT op past connect() (e.g.
// getPrimaryService, Chromium #40212297) can hang forever after a drop, which
// would stall the reconnect loop and freeze the mirror. Cap the entire setup.
const RECONNECT_SETUP_TIMEOUT = 15000;

let server = null;
let service = null;

// BLE characteristic registry: maps each setting to its GATT uuid, properties,
// byte structure and last-read data. connect() and BLEwriteTo() iterate it.
const settings = {
	screensaver: {
		uuid: SCREENSAVER_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		dataUpdated: (self) => {
			if (self.data.V[0]) {
				ponButton.className = "btn btn-success";
				poffButton.className = "btn btn-secondary";
			} else {
				poffButton.className = "btn btn-danger";
				ponButton.className = "btn btn-secondary";
			}
		},
	},
	volume: {
		uuid: VOLUME_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		dataUpdated: (self) => {
			volumeRange.value = self.data.V[0];
		},
	},
	// Read/write: 256-byte 8x8 RGBA ambience frame.
	projector: {
		uuid: PROJECTOR_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		// Render the live projector display into the mirror canvas. The
		// firmware broadcasts its actual matrix after every frame change.
		// Notifications coalesce to the newest frame per animation frame, so
		// a burst of buffered notifications (e.g. after the screen wakes) is
		// never replayed through the mirror — it jumps straight to the latest.
		_pendingFrame: null,
		_renderScheduled: false,
		dataUpdated: (self, dataReceived) => {
			if (!dataReceived || dataReceived.byteLength < 256) return;
			if (!self._pendingFrame) self._pendingFrame = new Uint8Array(256);
			self._pendingFrame.set(new Uint8Array(dataReceived.buffer, dataReceived.byteOffset, 256));
			if (!self._renderScheduled) {
				self._renderScheduled = true;
				requestAnimationFrame(() => {
					renderProjectorFrame(new DataView(self._pendingFrame.buffer));
					self._renderScheduled = false;
				});
			}
		}
	},
	// Read/write: user message text.
	text: {
		uuid: TEXT_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null
	},
	// Read/write: bridge text channel (raw chars, auralized one note per frame).
	bridge: {
		uuid: BRIDGE_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null
	},
	// Read/write: auralizer pitch offset (int16 Hz). Shifts the 3-octave scale.
	tone: {
		uuid: TONE_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Int16"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		dataUpdated: (self) => {
			toneRange.value = self.data.V[0];
		},
	},
	solidColor: {
		uuid: COLOR_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8", "Uint8", "Uint8"],
		data: { R: [], G: [], B: [] },
		writeBusy: false,
		writeValue: null,
		suppressWrite: false,
		dataUpdated: (self) => {
			if (
				self.data.R &&
				self.data.R.length &&
				self.data.G &&
				self.data.G.length &&
				self.data.B &&
				self.data.B.length
			) {
				// A remote (other-client) update: apply it without echoing a write back.
				self.suppressWrite = true;
				self.colorPicker.color.rgbString = `rgb(${self.data.R[0]}, ${self.data.G[0]}, ${self.data.B[0]})`;
				setTimeout(() => { self.suppressWrite = false; }, 0);
			}
		},
	},
};

const settingKeys = Object.keys(settings);


// Promise-based delay.
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Race a promise against a timeout so a hanging gatt.connect()
// (Chromium Linux issue #40212297) can't stall the reconnect loop.
function withTimeout(promise, ms) {
	return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);
}

// Look up a settings entry by characteristic UUID.
function findSetting(uuid) {
	for (const key of settingKeys) {
		var setting = settings[key];
		if (setting.uuid === uuid) return setting;
	}
}

// Look up a settings key by characteristic UUID.
function getSettingKey(uuid) {
	for (const key of settingKeys) {
		var setting = settings[key];
		if (setting.uuid === uuid) return key;
	}
}

let color = {
	rgb: {
		r: 0,
		g: 0,
		b: 0,
	},
	hexString: "#000000",
};

const connectButton = document.getElementById("connectButton");
const ambienceButton = document.getElementById("ambienceButton");
const message = document.getElementById("message");
const bridgeMessage = document.getElementById("bridgeMessage");
const firmwareVersion = document.getElementById("firmwareVersion");

// Hide the ambience (screen capture) control on clients without getDisplayMedia.
// The mirror canvas stays visible regardless — it displays the projector state.
if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
	const ambienceRow = document.getElementById("ambienceRow");
	if (ambienceRow) ambienceRow.style.display = "none";
}


const poffButton = document.getElementById("poffButton");
const ponButton = document.getElementById("ponButton");

// Screensaver on/off buttons.
poffButton.onclick = () => {
	poffButton.className = "btn btn-danger";
	ponButton.className = "btn btn-secondary";
	updateScreensaver(false);
};
ponButton.onclick = () => {
	ponButton.className = "btn btn-success";
	poffButton.className = "btn btn-secondary";
	updateScreensaver(true);
};

const volumeRange = document.getElementById("volumeRange");

// Volume slider.
volumeRange.oninput = () => {
	updateVolume(volumeRange.value);
};

const toneRange = document.getElementById("toneRange");

// Tone slider: auralizer pitch offset (Hz).
toneRange.oninput = () => {
	const v = clamp(Number(toneRange.value), TONE_OFFSET_MIN, TONE_OFFSET_MAX);
	updateTone(v);
};


// Hue picker: hidden input mirrors the iro picker's color.
const solidColorInput = document.getElementById("solidColorInput");
solidColorInput.oninput = () => {
	const colorPicker = settings.solidColor.colorPicker;

	colorPicker.color.hexString = solidColorInput.value;
};

initColorPicker();

// Web Bluetooth support check + Connect button.
if ("bluetooth" in navigator) {
	connectButton.addEventListener("click", function(event) {
		event.preventDefault();
		connect();
	});
} else {
	connectButton.className = "btn btn-danger";
	let reason = "This browser doesn't support Web Bluetooth.";
	if (!window.isSecureContext) {
		reason += "\n\nWeb Bluetooth requires a secure context. Serve this page over HTTPS or from localhost.";
	} else if (/Linux/i.test(navigator.platform)) {
		reason += "\n\nOn Linux, Web Bluetooth is experimental. Enable the flag in Chrome:\nchrome://flags/#enable-experimental-web-platform-features\n(requires Linux Kernel 3.19+ and BlueZ 5.41+)";
	}
	alert("Error: " + reason + "\n\nTry using Chrome.");
}

// Screen capture support check + Ambience button.
if ("mediaDevices" in navigator) {
	ambienceButton.addEventListener("click", function(event) {
		event.preventDefault();
		connectAmbience();
	});
} else {
	ambienceButton.className = "btn btn-danger";
	alert(
		"Error: This browser doesn't support media devices. Try using Chrome."
	);
}

// Send the message on form submit. Only the field that triggered the submit
// (the focused input) is sent, so Enter in Message writes only text and Enter
// in Bridge writes only the bridge channel.
form.addEventListener("submit", function(event) {
	event.preventDefault();
	const active = document.activeElement;
	if (active === message) {
		updateText(message.value);
	} else if (active === bridgeMessage) {
		updateBridgeText(bridgeMessage.value);
	}
});

let device = null;
let reconnecting = false;   // prevent parallel reconnect loops



// Connect: reuse device or prompt, then run shared GATT setup.
async function connect() {
	
	connectButton.className = "btn btn-primary";
	connectButton.disabled = true;
	connectButton.innerText = "Connecting";

	try {
		if (device == null) {
			device = await navigator.bluetooth.requestDevice({
				filters: [
					{
						services: [SERVICE_UUID],
					},
				],
				optionalServices: [DIS_UUID],
			});
             
		}

		// Register once so reconnect never stacks duplicate listeners.
		if (!device._hasDisconnectListener) {
			device.addEventListener("gattserverdisconnected", onDisconnected);
			device._hasDisconnectListener = true;
		}

		// Linux Chrome does not reliably fire gattserverdisconnected, so
		// poll device.gatt.connected to detect a dropped link and
		// trigger reconnect.
		if (!device._bleWd) {
			device._bleWd = setInterval(() => {
				if (device && device.gatt && !device.gatt.connected && !reconnecting) {
					onDisconnected();
				}
			}, 2000);
		}

		await setupGatt(device);
		onConnected();
	} catch (error) {
		console.error(error.message);
		connectButton.className = "btn btn-danger";
		connectButton.disabled = false;
		connectButton.innerText = "Connect";
	}
}

// Called whenever GATT setup succeeds (initial connect or reconnect).
function onConnected() {
	updateText(" WEB   ");
	setConnectedUI();
}

// Read firmware version from Device Information Service (DIS).
// Returns null if DIS is unavailable so the connection can still proceed.
async function readFirmwareVersion(server) {
	try {
		const disService = await server.getPrimaryService(DIS_UUID);
		const fwChar = await disService.getCharacteristic(FIRMWARE_REV_UUID);
		const data = await fwChar.readValue();
		return new TextDecoder().decode(data).trim();
	} catch (error) {
		console.warn("Could not read firmware version from DIS:", error);
		return null;
	}
}

// GATT setup, shared by the initial connect and every reconnect. The old
// server/service/characteristic objects are stale after a drop, so this
// re-fetches everything and re-subscribes on each call.
async function setupGatt(device) {
	server = await withTimeout(device.gatt.connect(), 5000);
	await sleep(500);
	service = await server.getPrimaryService(SERVICE_UUID);

	const fwVersion = await readFirmwareVersion(server);
	if (fwVersion !== null) {
		firmwareVersion.textContent = fwVersion;
	}
	if (fwVersion !== null && fwVersion !== EXPECTED_FW_VERSION) {
		alert(
			`Firmware version mismatch: device reports "${fwVersion}", expected "${EXPECTED_FW_VERSION}".\n\n` +
			"Please forget this device in your browser's Bluetooth settings and re-pair it."
		);
		throw new Error(`Firmware version mismatch: ${fwVersion}`);
	}

	for (const key of settingKeys) {
		
		try {
			console.log(key);
			const setting = settings[key];
			setting.characteristic = await service.getCharacteristic(setting.uuid);
            
		if (setting.properties.includes("BLERead")) {
			for (let attempt = 0; ; attempt++) {
				try {
					const data = await setting.characteristic.readValue();
					handleIncoming(setting, data);
					break;
				} catch (error) {
					if (attempt >= 3) throw error;
					await sleep(200);
				}
			}
		}

		// Subscribe to notifications so changes from any client update this page.
		// Retry: back-to-back GATT operations during connect can transiently
		// fail with "GATT operation failed" on Android.
		// The projector (live-mirror) stream is deferred to AFTER this loop: once
		// subscribed the firmware floods this connection with frames, so only
		// enable it once every other characteristic is fully set up.
		if (key !== "projector" && setting.characteristic.properties.notify) {
			setting.characteristic.addEventListener("characteristicvaluechanged", (event) => {
				handleIncoming(setting, event.target.value);
			});
			for (let attempt = 0; ; attempt++) {
				try {
					await setting.characteristic.startNotifications();
					break;
				} catch (error) {
					if (attempt >= 3) throw error;
					await sleep(200);
				}
			}
		}

			setting.rendered = false;
		} catch (error) {
			console.log(`error loading characteristic ${key}`);
			console.log(error.message);
		}
	}

	// Live-mirror projector stream subscribes LAST, after the connection is fully
	// open (every characteristic above is set up). This is the trigger that makes
	// the firmware start broadcasting display frames to this page.
	try {
		const setting = settings.projector;
		if (setting.characteristic && setting.characteristic.properties.notify) {
			setting.characteristic.addEventListener("characteristicvaluechanged", (event) => {
				handleIncoming(setting, event.target.value);
			});
			for (let attempt = 0; ; attempt++) {
				try {
					await setting.characteristic.startNotifications();
					break;
				} catch (error) {
					if (attempt >= 3) throw error;
					await sleep(200);
				}
			}
		}
	} catch (error) {
		console.log("error subscribing to projector mirror");
		console.log(error.message);
	}
}

function setConnectedUI() {
	connectButton.className = "btn btn-success";
	connectButton.disabled = true;
	connectButton.innerText = "Connected";
	message.disabled = false;
	message.placeholder = "Enter text";
	bridgeMessage.disabled = false;
	bridgeMessage.placeholder = "Enter text";
	poffButton.disabled = false;
	ponButton.disabled = false;
	volumeRange.disabled = false;
	toneRange.disabled = false;
	document.getElementById("color-picker-container").classList.remove("disabled");
}

function setDisconnectedUI() {
	connectButton.className = "btn btn-danger";
	connectButton.disabled = false;
	connectButton.innerText = "Connect";
	message.disabled = true;
	message.placeholder = "Disconnected";
	bridgeMessage.disabled = true;
	bridgeMessage.placeholder = "Disconnected";
	poffButton.disabled = true;
	ponButton.disabled = true;
	volumeRange.disabled = true;
	toneRange.disabled = true;
	document.getElementById("color-picker-container").classList.add("disabled");
}


// Device dropped: reconnect in place with exponential backoff so the page
// (and a running ambience stream) survives transient drops. Never reloads.
async function onDisconnected() {
	if (reconnecting) return;
	reconnecting = true;

	connectButton.className = "btn btn-primary";
	connectButton.disabled = true;
	connectButton.innerText = "Reconnecting…";

	let backoff = RECONNECT_DELAY;
	try {
		for (;;) {
			await sleep(backoff);
			try {
				await withTimeout(setupGatt(device), RECONNECT_SETUP_TIMEOUT);
				onConnected();
				return;
			} catch (error) {
				console.error("Reconnect failed:", error.message);
				if (error.message.startsWith("Firmware version mismatch")) {
					connectButton.className = "btn btn-danger";
					connectButton.disabled = false;
					connectButton.innerText = "Connect";
					return;
				}
				backoff = Math.min(backoff * 2, RECONNECT_MAX_DELAY);
			}
		}
	} finally {
		reconnecting = false;
	}
}

// Remember the live connection so the next page load auto-reconnects.
window.addEventListener("pagehide", function() {
	if (device && device.gatt && device.gatt.connected) {
		sessionStorage.setItem("bleReloaded", "1");
	}
});



// Write a setting's pending value, coalescing to the latest value if a write
// is already in flight. Dropping the write instead (old behaviour) means a fast
// slider/picker drag can leave the device on a stale value and cause jitter on
// every other connected client as they chase the last colour that made it out.
async function BLEwriteTo(key) {

	const setting = settings[key];
	if (setting.writeBusy) {
		setting.writePending = true;
		return;
	}
	setting.writeBusy = true;
	do {
		setting.writePending = false;
		await setting.characteristic
			.writeValueWithResponse(setting.writeValue)
			.catch((error) => {
				console.log(error);
			});
		// If new values arrived while writing, loop again with the latest one.
	} while (setting.writePending);
	setting.writeBusy = false;
}


// Unpack raw GATT bytes into setting.data using its structure map, then call dataUpdated.
function handleIncoming(setting, dataReceived) {

	const columns = Object.keys(setting.data);
	const typeMap = {
		Uint8: { fn: DataView.prototype.getUint8, bytes: 1 },
		Uint16: { fn: DataView.prototype.getUint16, bytes: 2 },
		Int16: { fn: DataView.prototype.getInt16, bytes: 2 },
		Float32: { fn: DataView.prototype.getFloat32, bytes: 4 },
	};
	let packetPointer = 0;
	let i = 0;

	setting.structure.forEach(function(dataType) {
		try {
			var dataViewFn = typeMap[dataType].fn.bind(dataReceived);
			var unpackedValue = dataViewFn(packetPointer, true);
			setting.data[columns[i]][0] = unpackedValue;
			packetPointer += typeMap[dataType].bytes;
		} catch (error) {
			console.error(error);
		}
		i++;
	});
	setting.rendered = false;
	if (setting.dataUpdated) setting.dataUpdated(setting, dataReceived);
}

// Create the iro color picker wired to the solidColor characteristic.
function initColorPicker() {
	settings.solidColor.colorPicker = new iro.ColorPicker(
		"#color-picker-container",
		{
			width: 144,
			color: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
		}
	);

	// Standard disabled look until connected: fade out + block interaction.
	document.getElementById("color-picker-container").classList.add("disabled");

	solidColorInput.value = color.hexString;

	// RGB Color Picker
	settings.solidColor.colorPicker.on("color:change", updateColor);
	function updateColor(color) {

		// Never echo a color that arrived via a notification back to the device:
		// that would make the firmware broadcast it to every other client,
		// which re-triggers their color:change and re-writes it — an infinite
		// ping-pong that makes every picker jitter.
		if (settings.solidColor.suppressWrite) return;

		var rgb_values = Uint8Array.of(color.rgb.r, color.rgb.g, color.rgb.b);
		settings.solidColor.writeValue = rgb_values;
		BLEwriteTo("solidColor");

		solidColorInput.value = color.hexString;
	}
}

// Update helpers: set a Uint8 value and write it to the device.
function updateScreensaver(state) {

	const value = state ? 1 : 0;
	settings.screensaver.writeValue = Uint8Array.of(value);
	BLEwriteTo("screensaver");

}

function updateVolume(value) {

	settings.volume.writeValue = Uint8Array.of(value);
	BLEwriteTo("volume");

}

function updateTone(value) {

	// Signed int16, little-endian (matches firmware Tone characteristic).
	const buf = new ArrayBuffer(2);
	const dv = new DataView(buf);
	dv.setInt16(0, value, true);
	settings.tone.writeValue = new Uint8Array(buf);
	BLEwriteTo("tone");

}

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function updateProjector(value) {

	settings.projector.writeValue = new Uint8Array(value.buffer);
	BLEwriteTo("projector");

}

// Render a 256-byte 8x8 RGBA frame from the firmware into the mirror canvas.
// Rendered upright (buffer row y -> canvas row y) so text reads correctly.
function renderProjectorFrame(dataReceived) {
	if (!dataReceived || dataReceived.byteLength < 256) return;

	const bytes = new Uint8Array(
		dataReceived.buffer,
		dataReceived.byteOffset,
		256
	);
	const img = context.createImageData(8, 8);
	for (let y = 0; y < 8; y++) {
		const srcRow = y * 32;
		for (let x = 0; x < 8; x++) {
			const src = srcRow + x * 4;
			const dst = (y * 8 + x) * 4;
			img.data[dst]     = bytes[src];
			img.data[dst + 1] = bytes[src + 1];
			img.data[dst + 2] = bytes[src + 2];
			img.data[dst + 3] = bytes[src + 3];
		}
	}
	context.putImageData(img, 0, 0);
}

function updateText(value) {
	value = value.slice(0, 256);
	settings.text.writeValue = new Uint8Array(str2ab(value));
	BLEwriteTo("text");
}

function updateBridgeText(value) {
	value = value.slice(0, 256);
	settings.bridge.writeValue = new Uint8Array(str2ab(value));
	BLEwriteTo("bridge");
}



// Dot-lens overlay mask: 8x8 grid of round transparent holes over opaque
// black, each LED showing through a lens. Inlined so the page is fully
// self-contained. Ported from opencode-rgbify-plugin/src/dots.ts.
const DOTS_PNG = "data:image/png;base64,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";

// 8x8 mirror canvas showing the projector's live display (overlay adds the dot grid).
const canvas = document.getElementById('screencanvas');
canvas.width = 8;
canvas.height = 8;
canvas.style.width = '100%';
canvas.style.height = 'auto';
canvas.style.backgroundColor = '#000';
canvas.style.imageRendering = 'pixelated';

const overlay = document.getElementById('overlay');
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundImage = "url('" + DOTS_PNG + "')";

const context = canvas.getContext('2d');
const oc = document.createElement("canvas");
oc.width = 100;
oc.height = 100;

const octx = oc.getContext('2d');
octx.filter = "blur(5px) contrast(120%)";

// Offscreen 8x8 scratch canvas: the ambience downsample source. Kept off the
// visible mirror canvas so firmware notifications are the single source of truth.
const frameCanvas = document.createElement("canvas");
frameCanvas.width = 8;
frameCanvas.height = 8;
const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });

let track = null;
let capture = null;

// Capture the screen, then stream downsampled 8x8 frames to the projector.
async function connectAmbience() {
	if (ambience) return;

	ambienceButton.className = "btn btn-secondary";
	ambienceButton.disabled = true;

	const isAndroid = /Android/i.test(navigator.userAgent);
	const constraints = isAndroid ? { video: true } : { video: { displaySurface: "monitor" } };

	await navigator.mediaDevices.getDisplayMedia(constraints).then(stream => {
		track = stream.getVideoTracks()[0];
		capture = new ImageCapture(track);
		track.addEventListener('ended', () => onAmbienceDisconnected());
		interval = setInterval(streamer, FPS);
		ambienceButton.className = "btn btn-success";
		ambienceButton.innerText = "Connected";
		ambience = true;
		ambienceButton.disabled = true;
	}).catch(err => {
		console.log('requestMedia error:');
		console.log(err);
		ambience = false;
		ambienceButton.className = "btn btn-danger";
		ambienceButton.disabled = true;
		ambienceButton.innerText = "Connect";
	})
}


// Reset ambience UI state when the shared screen track ends.
function onAmbienceDisconnected() {
	ambience = false;
	ambienceButton.className = "btn btn-danger";
	ambienceButton.disabled = false;
	ambienceButton.innerText = "Connect";
	clearInterval(interval);
	track.stop();
}


// Each tick: crop square, blur+contrast via offscreen canvas, downsample to 8x8, send.
async function streamer() {
	if (ambience && document.hidden)
		onAmbienceDisconnected();
	else
		if (ambience)
			await capture.grabFrame().then(bitmap => {
				w = bitmap.width; h = bitmap.height;
				x = 0; y = 0;
				if (w > h) {
					x = (w - h) / 2;
					w = h;
				} else {
					y = (h - w) / 2;
					h = w;
				}

			octx.drawImage(bitmap, x, y, w, h, 0, 0, 100, 100); //step
			frameCtx.drawImage(oc, 0, 0, 8, 8);
			updateProjector(frameCtx.getImageData(0, 0, 8, 8).data);

			}).catch(err => { console.log(err); /*sometimes capture is undefined, ignore as frame skip*/ })
}

// String to ArrayBuffer (ASCII bytes).
function str2ab(str) {
	var buf = new ArrayBuffer(str.length);
	var bufView = new Uint8Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

  // Auto-reconnect after page reload triggered by disconnect.
  if (sessionStorage.getItem('bleReloaded') === '1') {
      sessionStorage.removeItem('bleReloaded');
      connect();
  }