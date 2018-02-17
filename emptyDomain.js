function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

var floor = null;
function init() {
    var properties = {
        name: "floor",
        type: "Box",
        position: putEntityAcrossFromAvatar(MyAvatar),
        dimensions: {x: 25, y: 5, z: 25}
    };
    if (!floor) {
        floor = Entities.addEntity(properties, true);
    }
}

function cleanup() {
    Entities.deleteEntity(floor);
    floor = null;
}
init();
Script.scriptEnding.connect(cleanup);
