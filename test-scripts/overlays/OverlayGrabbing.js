(function () {
    var cubeOverlay = Overlays.addOverlay("cube", {
        color: { green: 0.0, blue: 255.0, red: 0.0 },
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(Quat.getFront(MyAvatar.orientation), 0.5)),
        isSolid: true,
        dimensions: {x: 0.2, y: 0.2, z: 0.2},
        grabbable: true/
    });

    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(cubeOverlay);
    });
}());
