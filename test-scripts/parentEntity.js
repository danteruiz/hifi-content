var entityID = null;

function putOverlayAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}


var userData = {
};
function init() {
    var controllerRightHand = "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND";
    var rightHand = "Head";
    var jointIndex = MyAvatar.getJointIndex(rightHand);
    var properties = {
        name: "testEntity",
        type: "Text",
        // modelURL: Script.resourcesPath() + "meshes/tablet-with-home-button-small-bezel.fbx",
        parentID: MyAvatar.sessionUUID,
        localPosition: Vec3.ZERO,
        parentJointIndex: jointIndex,
        dimensions : {x: 0.3, y: 0.3, z: 0.3},
        text: "Hello"
    };

    if (!entityID) {
        entityID = Entities.addEntity(properties, true);
    }
}

function cleanup() {
    Entities.deleteEntity(entityID);
    entityID = null;
}

Script.scriptEnding.connect(cleanup);

init();
