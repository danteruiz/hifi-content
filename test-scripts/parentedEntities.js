var entities = [];
var child = null;
var parent = null;

function random() {
    return Math.floor((Math.random() * 255));
}

function randomColor() {
    var color = {
        red: random(),
        green: random(),
        blue: random()
    };
    return color;
}

function putAcrossFromAvatar(avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function putAcrossFromAvatarWithOffset(avatar, offset) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot))), Vec3.multiply(offset, Quat.getRight(avatarRot)));
    return position;
}

function init() {
    var parentProperties = {
        type: "Box",
        color: randomColor(),
        position: putAcrossFromAvatar(MyAvatar),
        dynamic: false,
        userData: "{\"grabbableKey\":{\"grabbable\":false}}"
    };

    if (parent === null) {
        parent = Entities.addEntity(parentProperties);
    }

    var childProperties = {
        type: "Box",
        color: randomColor(),
        position: putAcrossFromAvatarWithOffset(MyAvatar, 0.5),
        dynamic: false,
        userData: "{\"grabbableKey\":{\"grabbable\":true}}",
        parentID: parent
    };

    if (child === null) {
        child = Entities.addEntity(childProperties);
    }
}

function cleanup() {
    Entities.deleteEntity(parent);
    parent = null;
    Entities.deleteEntity(child);
    child = null;
}

Script.scriptEnding.connect(cleanup);

init();


