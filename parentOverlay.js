var overlay = null;
var currentID = null
var oldID = null;
var debugPosition = {
    position: {x: 0, y: 0, z: 0},
    oldSelfID: null,
    currentSelfID: null,
    overlayParentID: null
};

function putOverlayAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {
    var properties = {
        name: "overlaySphere",
        type: "Sphere",
        parentID: MyAvatar.SELF_ID,
        visible: true,
        position: putOverlayAcrossFromAvatar(MyAvatar)
    };

    if (!overlay) {
        overlay = Overlays.addOverlay("sphere", properties);
    }

    currentID = MyAvatar.SELF_ID;
    debugPosition.currentSelfID = currentID;
}

function updateValues() {
    if (overlay) {
        debugPosition.position = Overlays.getProperty(overlay, "position");
        var parentID = Overlays.getProperty(overlay, "parentID");
        print(parentID);
        debugPosition.overlayParentID = Overlays.getProperty(overlay, "parentID");
    }
}

function cleanup() {
    Overlays.deleteOverlay(overlay);
    overlay = null;
    Script.update.disconnect(updateValues);
    print("---------> cleaning up <--------");
}

Window.domainChanged.connect(function() {
    oldID = currentID;
    currentID = MyAvatar.SELF_ID;
    debugPosition.oldSelfID = oldID;
    debugPosition.currentSelfID = currentID
    print("---------> changing domain <---------");
});

init();
Script.registerValue("parentOverlay", debugPosition);
Script.update.connect(updateValues);
Script.scriptEnding.connect(cleanup);
