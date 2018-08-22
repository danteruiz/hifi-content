

/* jslint bitwise: true */

/* global Script, HMD, Tablet, Entities */
(function() {
    var BUTTON_PROPERTIES = {
        text: "TEST"
    };
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton(BUTTON_PROPERTIES);

    button.clicked.connect(onClicked);

    function onClicked() {
        Recording.loadRecording("someFile", function(success, url) {
            print("-----> callback value: " + success + url);
        });
    }


    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }

        tablet.removeButton(button);
    });
}());
