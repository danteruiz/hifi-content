(function() {
    var webOverlay = Overlays.addOverlay("web3d", {
        visible: true,
        dimensions: { x: 1, y: 1, z: 0 },
        url: Script.resolvePath("qml/RedRectangle.qml"),
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(2.0, Quat.getFront(MyAvatar.orientation))),
        orientation: MyAvatar.orientation,
        alpha: 1.0,
        dpi: 20
    });

    print(Script.resolvePath("qml/RedRectangle.qml"));

    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(webOverlay);
    });
}());
