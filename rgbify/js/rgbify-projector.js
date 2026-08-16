const SERVICE_UUID     = "8bc01404-0000-4bf4-95d1-ce27a0477183";
const VIDEO_UUID       = "8bc01404-0001-4bf4-95d1-ce27a0477183";
const AUDIO_UUID       = "8bc01404-0002-4bf4-95d1-ce27a0477183";
const BRIGHTNESS_UUID  = "8bc01404-0003-4bf4-95d1-ce27a0477183";
const VOLUME_UUID      = "8bc01404-0004-4bf4-95d1-ce27a0477183";
const COLOR_UUID       = "8bc01404-0005-4bf4-95d1-ce27a0477183";
const PROJECTOR_UUID   = "8bc01404-0006-4bf4-95d1-ce27a0477183";
const TEXT_UUID        = "8bc01404-0007-4bf4-95d1-ce27a0477183";
const SCREENSAVER_UUID = "8bc01404-0008-4bf4-95d1-ce27a0477183";

let ambience = false;
const maxRecords = 128;
const FPS = 30;

let server = null;
let service = null;

// BLE characteristic registry: maps each setting to its GATT uuid, properties,
// byte structure and last-read data. connect() and BLEwriteTo() iterate it.
const settings = {
	video: {
		uuid: VIDEO_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		dataUpdated: (self) => {
			if (self.data.V[0]) {
				onButton.className = "btn btn-success";
				offButton.className = "btn btn-secondary";
			} else {
				offButton.className = "btn btn-danger";
				onButton.className = "btn btn-secondary";
			}
		},
	},
	audio: {
		uuid: AUDIO_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		dataUpdated: (self) => {
			if (self.data.V[0]) {
				sonButton.className = "btn btn-success";
				soffButton.className = "btn btn-secondary";
			} else {
				soffButton.className = "btn btn-danger";
				sonButton.className = "btn btn-secondary";
			}
		},
	},
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
	brightness: {
		uuid: BRIGHTNESS_UUID,
		properties: ["BLERead", "BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null,
		dataUpdated: (self) => {
			brightnessRange.value = self.data.V[0];
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
	// Write-only: 256-byte 8x8 RGBA ambience frame.
	projector: {
		uuid: PROJECTOR_UUID,
		properties: ["BLEWrite"],
		structure: ["Uint8"],
		data: { V: [] },
		writeBusy: false,
		writeValue: null
	},
	// Write-only: user message text.
	text: {
		uuid: TEXT_UUID,
		properties: ["BLEWrite"],
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
		dataUpdated: (self) => {
			if (
				self.data.R &&
				self.data.R.length &&
				self.data.G &&
				self.data.G.length &&
				self.data.B &&
				self.data.B.length
			) {
				self.colorPicker.color.rgbString = `rgb(${self.data.R[0]}, ${self.data.G[0]}, ${self.data.B[0]})`;
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
const offButton = document.getElementById("offButton");
const onButton = document.getElementById("onButton");
const message = document.getElementById("message");


// Video on/off buttons.
offButton.onclick = () => {
	offButton.className = "btn btn-danger";
	onButton.className = "btn btn-secondary";
	updateVideo(false);
};
onButton.onclick = () => {
	onButton.className = "btn btn-success";
	offButton.className = "btn btn-secondary";
	updateVideo(true);
};

const soffButton = document.getElementById("soffButton");
const sonButton = document.getElementById("sonButton");

// Audio on/off buttons.
soffButton.onclick = () => {
	soffButton.className = "btn btn-danger";
	sonButton.className = "btn btn-secondary";
	updateAudio(false);
};
sonButton.onclick = () => {
	sonButton.className = "btn btn-success";
	soffButton.className = "btn btn-secondary";
	updateAudio(true);
};

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

const brightnessRange = document.getElementById("brightnessRange");

// Brightness slider.
brightnessRange.oninput = () => {
	updateBrightness(brightnessRange.value);
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

// Send the message on form submit.
form.addEventListener("submit", function(event) {
	event.preventDefault();
	updateText(message.value);
});

let device = null;

// Reuse a previously granted device if one exists.
async function findDevice() {
	try {
		await navigator.bluetooth.getDevices()
			.then(devices => {
				for (const d of devices) {
					device = d;
					console.log(device.name + ' (' + device.id + ')');
				}
			})
			.catch(error => {
				console.log('Argh! ' + error);
			});

	} catch (e) { console.log(e); }
}




// Connect: reuse device or prompt, GATT connect, fetch characteristics, read readable ones.
async function connect() {
	
	connectButton.className = "btn btn-primary";
	connectButton.disabled = true;
	connectButton.innerText = "Connecting";

	try {
		await findDevice();
		if (device == null) {
			device = await navigator.bluetooth.requestDevice({
				filters: [
					{
						services: [SERVICE_UUID],
					},
				],
			});
             
		}
		
		device.addEventListener("gattserverdisconnected", onDisconnected);
		server = await device.gatt.connect();
		await sleep(500);
		service = await server.getPrimaryService(SERVICE_UUID);
        
        
		for (const key of settingKeys) {
			
			try {
				console.log(key);
				const setting = settings[key];
				setting.characteristic = await service.getCharacteristic(setting.uuid);
                
				if (setting.properties.includes("BLERead")) {
					await setting.characteristic.readValue().then((data) => {
						handleIncoming(setting, data);
					});
				}

				setting.rendered = false;
			} catch (error) {
				console.log(`error loading characteristic ${key}`);
				console.log(error.message);
			}
		}
		connectButton.className = "btn btn-success";
		connectButton.disabled = true;
		connectButton.innerText = "Connected";
		message.disabled = false;
		message.placeholder = "Enter text";
		offButton.disabled = false;
		onButton.disabled = false;
		soffButton.disabled = false;
		sonButton.disabled = false;
		poffButton.disabled = false;
		ponButton.disabled = false;
		brightnessRange.disabled = false;
		volumeRange.disabled = false;
		document.getElementById("color-picker-container").classList.remove("disabled");
	} catch (error) {
		console.error(error.message);
		location.reload();
	}
}


// Device dropped: reload the page.
async function onDisconnected() {
	location.reload();
}



// Write a setting's pending value, skipping if a write is already in flight.
async function BLEwriteTo(key) {

	const setting = settings[key];
	if (setting.writeBusy) return;
	setting.writeBusy = true;
	await setting.characteristic
		.writeValueWithResponse(setting.writeValue)
		.then((_) => {
			setting.writeBusy = false;
		})
		.catch((error) => {
			console.log(error);
		});
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
			setting.data[columns[i]].push(unpackedValue);
			if (setting.data[columns[i]].length > maxRecords) {
				setting.data[columns[i]].shift();
			}
			packetPointer += typeMap[dataType].bytes;
		} catch (error) {
			console.error(error);
		}
		i++;
	});
	setting.rendered = false;
	if (setting.dataUpdated) setting.dataUpdated(setting);
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

		var rgb_values = Uint8Array.of(color.rgb.r, color.rgb.g, color.rgb.b);
		settings.solidColor.writeValue = rgb_values;
		BLEwriteTo("solidColor");

		solidColorInput.value = color.hexString;
	}
}

// Update helpers: set a Uint8 value and write it to the device.
function updateVideo(state) {

	const value = state ? 1 : 0;
	settings.video.writeValue = Uint8Array.of(value);
	BLEwriteTo("video");

}

function updateAudio(state) {

	const value = state ? 1 : 0;
	settings.audio.writeValue = Uint8Array.of(value);
	BLEwriteTo("audio");

}

function updateScreensaver(state) {

	const value = state ? 1 : 0;
	settings.screensaver.writeValue = Uint8Array.of(value);
	BLEwriteTo("screensaver");

}

function updateVolume(value) {

	settings.volume.writeValue = Uint8Array.of(value);
	BLEwriteTo("volume");

}



function updateBrightness(value) {

	settings.brightness.writeValue = Uint8Array.of(value);
	BLEwriteTo("brightness");

}

function updateProjector(value) {

	settings.projector.writeValue = new Uint8Array(value.buffer);
	BLEwriteTo("projector");

}

function updateText(value) {
	settings.text.writeValue = new Uint8Array(str2ab(value));
	BLEwriteTo("text");
}



// Hidden 8x8 preview canvas for the ambience stream (overlay adds the dot grid).
const canvas = document.getElementById('screencanvas');
canvas.width = 8;
canvas.height = 8;
canvas.style.width = '100px';
canvas.style.height = '100px';
canvas.style.backgroundColor = '#000';
canvas.style.imageRendering = 'pixelated';
canvas.style.display = "none";

const overlay = document.getElementById('overlay');
overlay.width = 100;
overlay.height = 100;
overlay.style.width = '100px';
overlay.style.height = '100px';
overlay.style.display = "none";

const context = canvas.getContext('2d', { willReadFrequently: true });
const oc = document.createElement("canvas");
oc.width = 100;
oc.height = 100;

const octx = oc.getContext('2d');
octx.filter = "blur(5px) contrast(120%)";

let track = null;
let capture = null;

// Capture the screen, then stream downsampled 8x8 frames to the projector.
async function connectAmbience() {
	if (ambience) return;

	ambienceButton.className = "btn btn-secondary";
	ambienceButton.disabled = true;

	await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "monitor" } }).then(stream => {
		track = stream.getVideoTracks()[0];
		capture = new ImageCapture(track);
		track.addEventListener('ended', () => onAmbienceDisconnected());
		interval = setInterval(streamer, FPS);
		ambienceButton.className = "btn btn-success";
		ambienceButton.innerText = "Connected";
		ambience = true;
		ambienceButton.disabled = true;
		canvas.style.display = "block";
		overlay.style.display = "block";
	}).catch(err => {
		console.log('requestMedia error:');
		console.log(err);
		ambience = false;
		ambienceButton.className = "btn btn-danger";
		ambienceButton.disabled = true;
		ambienceButton.innerText = "Connect";
		canvas.style.display = "none";
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
	canvas.style.display = "none";
	overlay.style.display = "none";
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
				context.drawImage(oc, 0, 0, 8, 8);
				updateProjector(context.getImageData(0, 0, 8, 8).data);

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

  // Disconnect GATT when the page unloads.
  window.onbeforeunload = function(event)
    {
        if (device != null)
           device.gatt.disconnect();
    };