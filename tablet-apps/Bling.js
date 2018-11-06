// Bling.js

(function() {
    var BLING_TABLET_SOURCE = Script.resolvePath("./qml/Bling.qml");
    var BLING_SVG = Script.resolvePath("./images/Bling.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var isOpened = false;

    var buttonProperties = {
        text: "BLING",
	    icon: BLING_SVG
    };
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);

    function tabletMeshes() {
        print(HMD.tabletID);
        if (HMD.tabletID !== Uuid.NULL) {
	        var model = Graphics.getModel(HMD.tabletID);
	        print(JSON.stringify(model.meshes[0]));
        }
    }

    function onClicked() {
	    if (!isOpened) {
            tablet.loadQMLSource(BLING_TABLET_SOURCE);
	        //tabletMeshes();
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
