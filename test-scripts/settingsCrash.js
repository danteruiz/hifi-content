"use strict";
// settingCrash.js

(function() {
    function setSetting() {
        Settings.setValue("test", true);
        Menu.setIsOptionChecked("Developer Menu", true);
        Settings.getValue("test");
        Settings.getValue("SessionRunTime");
        var url = Settings.getValue("Avatar/fullAvatarURL");
        print(url);
        Settings.setValue("Avatar/fullAvatarURL", url);
        Script.setTimeout(setSetting, 10);
    }

    Script.scriptEnding(function() {
        setSetting();
    });

    setSetting();
}());
