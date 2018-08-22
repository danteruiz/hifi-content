"use strict";

(function() {
    var stage = Scene.stage;
    var keyLight = stage.keyLight;
    var time = stage.time;
    keyLight.color = { x: 0, y: 1, z: 4 };
    keyLight.intensitity = 8;
    stage.backgroundMode = "skybox";
    print(JSON.stringify(keyLight.color));
    print(stage.backgroundMode);
    print(time.day);
})();
