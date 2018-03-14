var entityID = null;

function putOverlayAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {
    var properties = {
        name: "testEntity",
        type: "Sphere",
        parentID: MyAvatar.sessionUUID,
        position: putOverlayAcrossFromAvatar(MyAvatar)
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
