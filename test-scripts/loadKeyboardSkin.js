// loadKeyboardSkin
(function() {
    var KEYBOARD_SKIN = Script.resourcesPath() + "config/keyboard.json";

     var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var buttonProperties = {
        text: "KS"
    };

    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);
    function onClicked() {
        print(KEYBOARD_SKIN);
        Keyboard.raised = false;
        Keyboard.loadKeyboardFile(KEYBOARD_SKIN);
    }


    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
