/*
 * This function opens a device via provided serial object
 * It then tries to claim all the interfaces and
 * adds the results to the table.
 */
function scanDevice(device) {
    var interfaces = device.configuration.interfaces;

    serial.connect(device)
        .then(() => {
            return serial.claimAllTheInterfaces(device)})
        .then(() => {
            var claimedInterfaces = [];
            interfaces.forEach(iface => {
                if (iface.claimed)
                    claimedInterfaces.push("#" + iface.interfaceNumber);
            })
            addDeviceToTable(device, claimedInterfaces);
        });
}

/*
 * This function generates necessary HTML for the device table
 * Don't hate the player, hate the jsgame
 */
function addDeviceToTable(device, claimedInterfaces) {
    // Helper
    function el(name) {
        return document.createElement(name);
    }

    function fourDigitHex(decimal) {
        return ("0000" + decimal.toString(16)).substr(-4);
    }

    var tr = el("tr"),
        tdName = el("td"),
        tdVendor = el("td"),
        tdSupport = el("td"),
        tdInterfaces = el("td"),
        tdIds = el("td"),
        glyph = el("span"),
        support = !!claimedInterfaces.length;

    tdName.innerText = device.productName;
    tdVendor.innerText = device.manufacturerName;
    glyph.className = "glyphicon glyphicon-";
    glyph.className += support ? "ok" : "remove";
    tdSupport.appendChild(glyph);
    tdInterfaces.innerText = claimedInterfaces.join(", ");
    tdIds.innerText = "0x" + fourDigitHex(device.vendorId);
    tdIds.innerText += " : 0x" + fourDigitHex(device.productId);
    tr.className = support ? "success" : "warning";
    
    tr.appendChild(tdName);
    tr.appendChild(tdVendor);
    tr.appendChild(tdSupport);
    tr.appendChild(tdInterfaces);
    tr.appendChild(tdIds);

    document.getElementById("devices").appendChild(tr);
}

/*
 * This function scans every plugged in device
 * the browser has already access to
 */
function scanGrantedDevices() {
    navigator.usb.getDevices().then(devices => {
        devices.forEach(device => scanDevice(device))
    });
}

/*
 * This function is our callback for the "Choose a
 * device" button. It opens the prompt in which we
 * request access to a device. It then scans the device
 * for support.
 */
function requestDevice() {
    serial.requestDevice()
        .then(device => scanDevice(device))
        // probably no device selected error:
        .catch(e => console.error(e));
}

/*
 * This is our initialize function that gets called
 * on JS load. It registers the callback for the
 * "Choose A Device" button and starts to scan
 * all devices the browser has already access to.
 */
function initialize() {
    document.getElementById("requestDevice").onclick = requestDevice;
    scanGrantedDevices();
}
