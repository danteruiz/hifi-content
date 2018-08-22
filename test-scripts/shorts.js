var softEntity = null;

function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {
    var jointIndex = MyAvatar.getJointIndex("Spine");
    var jointPosition = MyAvatar.getJointPosition(jointIndex);
    var jointRotation = MyAvatar.getJointRotation(jointIndex);
    print(MyAvatar.skeletonModelURL);
    var properties = {
        name: "Shirt",
        type: "Model",
        modelURL: "https://hifi-content.s3.amazonaws.com/jimi/avatar/photo-real/Clothes/Shorts.fbx",
        parentID: MyAvatar.sessionUUID,
        relayParentJoints: true,
        position: jointPosition,
        orientation: jointRotation
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
