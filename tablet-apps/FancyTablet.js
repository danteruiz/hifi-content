'use strictt';

(function() {
    var FANCY_TABLET_SOURCE = Script.resolvePath("./html/FancyTablet.html");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var buttonProperties = {
        text: "Fancy Tablet"
    };
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);
    function onClicked() {
        tablet.gotoWebScreen(FANCY_TABLET_SOURCE);
    }


    function fromQml(message) {
        if (message.hasOwnProperty("fancyTablet")) {
            print(message.fancyTablet.type);
        }
    }

    tablet.fromQml.connect(fromQml);

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
