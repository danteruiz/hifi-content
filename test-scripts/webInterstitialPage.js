// interstitial page test
(function() {
    var Y_AXIS = {x: 1, y: 0, z: 0};
     function calculateKeyboardPosition() {
        var headPosition = MyAvatar.getHeadPosition();
        var position = Vec3.sum(headPosition, Vec3.multiply(0.5, Quat.getFront(MyAvatar.orientation)));
        return position;
    }
    var webOverlay = Overlays.addOverlay("web3d", {
        name: "test",
        url: Script.resourcesPath() + "qml/test.qml",
        visible: true,
        drawInFront: true,
        alpha: 1.0,
        showKeyboardFocusHighlight: false,
        color: { red: 255, green: 255, blue: 255 },
        localPosition: {x: 0, y: 0, z: 0},
        dpi: 200,
        dimensions: { x: 10.0, y: 10.0, z: 10.0 },
        localRotation: Quat.angleAxis(180, Y_AXIS),
        parentID: MyAvatar.SELF_ID
    });


    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(webOverlay);
    });
}());
