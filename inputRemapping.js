/* global Script, Controller, Actions */

(function () { // BEGIN LOCAL_SCOPE
    print(Controller.getDeviceNames());
    var device = Controller.findDevice("Keyboard");
    print(device);
    print(Controller.getDeviceName(device));
    var mapping = Controller.getMappingByDeviceID(device);
    print(mapping);
    var Keyboard = Controller.Hardware.Keyboard;
    var Actions = Controller.Actions;
    print(Keyboard.T);
    print(Actions.LONGITUDINAL_FORWARD);
    var route = mapping.from(Keyboard.T).to(Actions.LONGITUDINAL_FORWARD);

    //mapping.enable();

}()); // END LOCAL_SCOPE
/*
(function () { // BEGIN LOCAL_SCOPE

    function keyPressEvent(event) {
        print("keypress: " + event.text.toUpperCase());
        // event.isAutoRepeat
        // event.isShifted
        // event.isMeta
        // event.isControl
        // event.isAlt
    }

    function keyReleaseEvent(event) {
        print("keyrelease: " + event.text.toUpperCase());
    }

    Controller.keyPressEvent.connect(keyPressEvent);
    Controller.keyReleaseEvent.connect(keyReleaseEvent);

    Script.scriptEnding.connect(function () {
        Controller.keyPressEvent.disconnect(keyPressEvent);
        Controller.keyReleaseEvent.disconnect(keyReleaseEvent);
    });

}());*/
