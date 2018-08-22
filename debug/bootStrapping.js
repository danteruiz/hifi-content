var entity = null;

function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.getHeadPosition(), Vec3.multiply(0.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {

    var entityProperties = {
        name: "entityOne",
        type: "Sphere",
        position: putEntityAcrossFromAvatar(MyAvatar),
        parentID: MyAvatar.sessionUUID,
        parentJointIndex: 72,
        dimensions: {x: 0.2, y: 0.2, z: 0.2}
    };

    if (!entity) {
        entity = Entities.addEntity(entityProperties);
    }
}


function cleanup() {
    Entities.deleteEntity(entity);
    entity = null;
}

init();
Script.scriptEnding.connect(cleanup);
