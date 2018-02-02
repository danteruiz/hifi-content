var softEntity = null;

function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

var shirt = "https://hifi-content.s3.amazonaws.com/jimi/avatar/photo-real/Clothes/TShirt.fbx";
var jacket =  "https://hifi-content.s3.amazonaws.com/jimi/avatar/Niconico/fst/3/jacket.fbx";

function init() {
    var jointIndex = MyAvatar.getJointIndex("Spine1");
    var jointPosition = MyAvatar.getJointPosition(jointIndex);
    var jointRotation = MyAvatar.getJointRotation(jointIndex);
    var userData = {
        Attachment: {
            action: "attach",
            joint: "Spine1",
            attached: false
        },
        grabbableKey: {
            cloneable: false,
            grabbable: true
        }
    };
    var properties = {
        name: "Shirt",
        type: "Model",
        modelURL: shirt,
        parentID: MyAvatar.sessionUUID,
        relayParentJoints: true,
        //script: "http://localhost:8000/attachmentItemScript.js",
        position: jointPosition
        //userData: JSON.stringify(userData)
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
