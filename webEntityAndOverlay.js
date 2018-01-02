"use strict";

(function() {
    var avRot = MyAvatar.orientation;
    var avRotEulers = Quat.safeEulerAngles(avRot);
    var forward = Quat.getForward(avRot);
    var orientation = Quat.lookAt({x: 0, y: 0, z: 0}, forward, Vec3.multiplyQbyV(MyAvatar.orientation, Vec3.UNIT_Y));
    var width = 1.6;
    var height = 0.9;
    var thickness = 0.01;
    var webEntity = Entities.addEntity({
        name: "webEntity",
        type: "Web",
        sourceUrl: "https://www.google.com",
        dimensions: {x: width, y: height, z: thickness},
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(avRot, { x: 1, y: 0.2, z: -2 })),
        rotation: orientation,
        userData: JSON.stringify({ grabbableKey: { grabbable: false} })
    });
    
    var web3DOverlay = Overlays.addOverlay("web3d", {
        name: "web3DOverlay",
        url: "https://www.google.com",
        resolution: {x: 1600, y: 1000},
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(avRot, { x: -1, y: 0.2, z: -2 })),
        rotation: orientation,
        alpha: 1.0,
        showKeyboardFocusHighlight: false,
        userData: JSON.stringify({ grabbableKey: { grabbable: false }})
    });

    function cleanup() {
        Entities.deleteEntity(webEntity);
        Overlays.deleteOverlay(web3DOverlay);
    }
    Script.scriptEnding.connect(cleanup);
}());
