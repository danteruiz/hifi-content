'use strictt';

(function() {
    var FANCY_TABLET_SOURCE = Script.resolvePath("./qml/FancyTablet.qml");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var buttonProperties = {
        text: "Fancy Tablet"
    };
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);
    function onClicked() {
        tablet.loadQMLSource(FANCY_TABLET_SOURCE);
    }


    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
