# WebUSB Support Checker

Read about WebUSB basics [here](https://researchblog.mwri.loc/2017/09/webusb-webusb-basics/).

To set it up it's completely sufficient to download the folder and execute

    python -m SimpleHTTPServer 8080

and browse to localhost:8080. WebUSB is so far only supported by Chrome. Chrome 61 supports it by default, earlier versions need this flag enabled:

    chrome://flags/#enable-experimental-web-platform-features

This site is intended to check basic support for a selected device.
It will achieve this goal by iterating over all interfaces a device offers and trying to claim those interfaces.

If at least one interface is claimable a web page can talk to the device via WebUSB.

If no interfaces are claimable that doesn't mean that the device is not supported.
It might be used by another application or your user might not have access rights (Linux only).
To grant access to a USB device on Linux a udev rule needs to be created.
The set of not supported devices include Webcams, HIDs and mass storage devices.

Generally, every device that has a native driver handle is unaccessible for the browser.

All devices that have been connected are automatically tested again.

Check the developer tools console for potential errors.
