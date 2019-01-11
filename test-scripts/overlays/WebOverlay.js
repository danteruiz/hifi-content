(function() {
    var webOverlay = Overlays.addOverlay("web3d", {
        visible: true,
        dimensions: { x: 1, y: 1, z: 0 },
        url: "hifi/tablet/TabletRoot.qml",
        position: MyAvatar.position,
        alpha: 1.0,
        color: { red: 255, green: 255, blue: 255 },
        dpi: 20
    });

    Script.update.connect(function(deltaTime) {
        var props = {
            position: Vec3.sum(Camera.position, Vec3.multiply(Quat.getFront(Camera.orientation), 2)),
            orientation: Quat.cancelOutPitchAndRoll(MyAvatar.orientation)
        };

        Overlays.editOverlay(webOverlay, props);
    });


    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(webOverlay);
    });
}());
