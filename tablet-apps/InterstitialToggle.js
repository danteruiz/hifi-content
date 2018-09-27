(function() {
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var enabled = Window.interstitialModeEnabled;

    var buttonProperties = {
        text: "IT"
    };
    var button = tablet.addButton(buttonProperties);
    button.editProperties({isActive: enabled});
    button.clicked.connect(onClicked);

    function onClicked() {
        enabled = !enabled;
        Window.interstitialModeEnabled = enabled;
        button.editProperties({isActive: enabled});
    }

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
