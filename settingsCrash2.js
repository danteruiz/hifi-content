"use strict";
// settingCrash.js

(function() {
    Menu.addMenu("This is just a test");
    function setSetting() {
        Settings.setValue("test", true);
        Menu.setIsOptionChecked("Developer Menu", true);
        Settings.getValue("test");
        Script.setTimeout(setSetting, 10);
    }

    Script.scriptEnding(function() {
        setSetting();
        Menu.removeMenu("This is just a test");
    });

    setSetting();
}());
