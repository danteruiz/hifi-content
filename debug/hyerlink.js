var entity = null;

function putEntityAcrossFromAvatar(avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {
    var properties = {
        name: "test",
        type: "Sphere",
        position: putEntityAcrossFromAvatar(MyAvatar),
        dimensions: {x: 0.5, y: 0.5, z: 0.5},
        href: "hifi://blue"
    };

    if (!entity) {
        entity = Entities.addEntity(properties);
        print(entity);
    }
}

init();

function cleanup() {
    Entities.deleteEntity(entity);
    entity = null;
}

Script.scriptEnding.connect(cleanup);
