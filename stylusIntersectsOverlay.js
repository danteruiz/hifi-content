(function() {
    Script.include("/~/system/libraries/controllerDispatcherUtils.js");
    Script.include("/~/system/libraries/controllers.js");
    var cube = Overlays.addOverlay("cube", {
        visible: true,
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0, z: 0.3})),
        dimensions: {x: 0.1, y: 0.1, z: 0.0},
        isSolid: true,
        grabbable: true
    });

    var pointer = Pointers.createPointer(PickType.Stylus, {
        hand: RIGHT_HAND,
        filter: Picks.PICK_OVERLAYS,
        hover: true,
        enabled: true
    });
    function mouseHoverEnter(overlayID, event) {
    }

    function mouseHoverLeave(overlayID, event) {
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function mousePress(overlayID, event) {
        Overlays.editOverlay(overlayID, {
            color: {
                red: randomInteger(128, 255),
                green: randomInteger(128, 255),
                blue: randomInteger(128, 255)
            }
        });
    }

    Overlays.hoverEnterOverlay.connect(mouseHoverEnter);
    Overlays.hoverLeaveOverlay.connect(mouseHoverLeave);
    Overlays.mousePressOnOverlay.connect(mousePress); 

    Pointers.setIncludeItems(pointer, [cube]);
    Pointers.setRenderState(pointer,"events on");

    Script.scriptEnding.connect(function() {
        Pointers.removePointer(pointer);
        Overlays.deleteOverlay(cube);
    });
}());
