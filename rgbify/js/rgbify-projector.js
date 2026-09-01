const SERVICE_UUID     = "8bc01404-0000-4bf4-95d1-ce27a0477183";
const VOLUME_UUID      = "8bc01404-0004-4bf4-95d1-ce27a0477183";
const COLOR_UUID       = "8bc01404-0005-4bf4-95d1-ce27a0477183";
const PROJECTOR_UUID   = "8bc01404-0006-4bf4-95d1-ce27a0477183";
const TEXT_UUID        = "8bc01404-0007-4bf4-95d1-ce27a0477183";
const BRIDGE_UUID      = "8bc01404-0009-4bf4-95d1-ce27a0477183";
const SCREENSAVER_UUID = "8bc01404-0008-4bf4-95d1-ce27a0477183";
const DIS_UUID              = "0000180a-0000-1000-8000-00805f9b34fb";
const FIRMWARE_REV_UUID     = "00002a26-0000-1000-8000-00805f9b34fb";
const EXPECTED_FW_VERSION   = "0.1.5";

let ambience = false;
const FPS = 30;

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
		dataUpdated: (self, dataReceived) => {
			renderProjectorFrame(dataReceived);
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

		await setupGatt(device);
		updateText("WEBBLE");
		setConnectedUI();
	} catch (error) {
		console.error(error.message);
		if (!error.message.startsWith("Firmware version mismatch")) {
			location.reload();
		} else {
			connectButton.className = "btn btn-danger";
			connectButton.disabled = false;
			connectButton.innerText = "Connect";
		}
	}
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
	server = await device.gatt.connect();
	await sleep(500);
	service = await server.getPrimaryService(SERVICE_UUID);

	const fwVersion = await readFirmwareVersion(server);
	if (fwVersion !== null) {
		firmwareVersion.textContent = `Version ${fwVersion}`;
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
		if (setting.characteristic.properties.notify) {
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
	document.getElementById("color-picker-container").classList.add("disabled");
}


// Device dropped: reload. The app never calls device.gatt.disconnect() on any
// platform — the browser/OS own connection caching and teardown. This handler
// only runs after gattserverdisconnected, i.e. the platform already dropped
// the link. We just reload; on reload connect() runs automatically to
// re-establish the BLE link (reusing the cached device).
async function onDisconnected() {
	if (reconnecting) return;
	reconnecting = true;

	connectButton.className = "btn btn-primary";
	connectButton.disabled = true;
	connectButton.innerText = "Reconnecting…";

	try {
		sessionStorage.setItem('bleReloaded', '1');
		await sleep(500);
		location.reload();
	} finally {
		reconnecting = false;
	}
}



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
			width: 150,
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