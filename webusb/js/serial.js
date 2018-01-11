// Yaaaay promises!

var serial = {};

// Opens the choose device prompt and returns a promise with a device
serial.requestDevice = function() {
    // Set an empty array as filter to get all the devices
    return navigator.usb.requestDevice({"filters":[]});
}

/* This function tries to claim all interfaces
 * It returns a promise that resolves when all
 * claiming tries are either resolved or
 * rejected.
 */
serial.claimAllTheInterfaces = function(device) {
    var intfs = device.configuration.interfaces;                    
                                                                    
    // This naughty block makes sure that all                       
    // interface claims are resolved                                
    // \o/ Promises \o/                                             
    return Promise.all(                                             
        intfs.map(interface => {
            return device.claimInterface(interface.interfaceNumber) 
                .catch((e) => {  
                    console.warn("This error is probably intended, "
                        + "can't claim all the interfaces. "
                        + "Error: ", e, "(" + device.productName + ")"); 
                })                                                  
        })                                                          
    )                                                               
}                                                                   



/* This function makes the device ready to talk to
 * It opens the device and selects a configuration
 */
serial.connect = function(device) {
    return device.open()
        .then(()=> {
            if(device.configuration == null) {
                return device.selectConfiguration(1);
            }
        })
}
