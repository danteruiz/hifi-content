(function() {
    var interstitialModeEnabled = Window.interstitialModeEnabled;
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var buttonProps = {
        text: "IT",
        isActive: interstitialModeEnabled
    };

    var button = tablet.addButton(buttonProps);
    button.clicked.connect(onClicked);

    function onClicked() {
        interstitialModeEnabled = !interstitialModeEnabled;
        Window.interstitialModeEnabled = interstitialModeEnabled;
        button.editProperties({
            isActive: interstitialModeEnabled
        });
    }

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
