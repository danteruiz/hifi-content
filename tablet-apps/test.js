"use strict"

/* jslint bitwise: true */

/* global Script, HMD, Tablet, Entities */
(function() {
    var QML_TEST_FILE = Script.resolvePath("./qml/test.qml");
    var BUTTON_PROPERTIES = {
        text: "TEST"
    };
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton(BUTTON_PROPERTIES);

    button.clicked.connect(onClicked);

    function onClicked() {
        tablet.loadQMLSource(QML_TEST_FILE);
    }


    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }

        button.removeButton(button);
    });
}());
