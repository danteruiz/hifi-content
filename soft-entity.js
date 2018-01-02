
var softEntity = null;


function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {
    var properties = {
        name: "Soft Entity",
        type: "Model",
        modelURL: MyAvatar.skeletonModelURL,
        relayParentJoints: true,
        parentID: MyAvatar.sessionUUID,
        position: putEntityAcrossFromAvatar(MyAvatar)
    };

    if (!softEntity) {
        softEntity = Entities.addEntity(properties);
    }
}

function cleanup() {
    Entities.deleteEntity(softEntity);
    softEntity = null;
}

init();

Script.scriptEnding.connect(cleanup);
