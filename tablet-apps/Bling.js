// Bling.js

(function() {
    var BLING_TABLET_SOURCE = Script.resolvePath("./html/Bling.html");
    var BLING_SVG = Script.resolvePath("./images/diamond3.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var isOpened = false;

    var buttonProperties = {
        text: "BLING",
	icon: BLING_SVG
    };
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);

    function tabletMeshes() {
	var model = Graphics.getModel(HMD.tabletID);
	print(JSON.stringify(model));
    }
    function onClicked() {
	if (!isOpened) {
            tablet.gotoWebScreen(BLING_TABLET_SOURCE);
	    tabletMeshes();
	} else {
	    tablet.gotoHomeScreen();
	}

	isOpened = !isOpened;
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
