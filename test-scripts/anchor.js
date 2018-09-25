(function() {
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var buttonProperties = {
        text: "KS"
    };

    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);
    function onClicked() {
        var avatarPosition = MyAvatar.position;
        var forwardOffset = Vec3.multiply(0.5, Vec3.multiplyQbyV(MyAvatar.orientation, Vec3.FRONT));
        var virticalOffset = Vec3.multiply(0.3, Vec3.multiplyQbyV(MyAvatar.orientation, Vec3.UP));

        var finalPosition = Vec3.sum(Vec3.sum(avatarPosition, forwardOffset), virticalOffset);
        var orientation = Quat.fromVec3Degrees({x: -90, y: 0, z: 0});

        Overlays.editOverlay(anchor, {
            position: finalPosition,
            orientation: MyAvatar.orientation//Quat.multiply(Quat.cancelOutRollAndPitch(MyAvatar.orentation), orientation)
        });
    }


    var anchor = Overlays.addOverlay("cube", {
        name: "anchor",
        position: { x: -0.04, y: -0.2, z: 0.045 },
        dimensions: { x: 0.03, y: 0.25, z: 0.03 },
        alpha: 1.0,
        solid: true,
        grabbable: true,
        visible: true
    });

    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(anchor);

        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
