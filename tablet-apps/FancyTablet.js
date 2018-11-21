'use strictt';

(function() {
    var FANCY_TABLET_SOURCE = Script.resolvePath("c:/Users/dante/github/hifi-orientationstation/antigrav/AltGrav.qml");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var buttonProperties = {
        text: "Fancy Tablet"
    };
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);
    function onClicked() {
        tablet.loadQMLSource(FANCY_TABLET_SOURCE);
    }


    function fromQml(message) {
        print(JSON.stringify(message));
    }

    tablet.fromQml.connect(fromQml);

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
