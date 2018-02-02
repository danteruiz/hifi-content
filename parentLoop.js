var avatarEntityOne = null;
var avatarEntityTwo = null;
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
    text: "Parent"
});

var isActive = false;

function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function deleteEntities() {
    Entities.deleteEntity(avatarEntityOne);
    Entities.deleteEntity(avatarEntityTwo);
    avatarEntityOne = null;
    avatarEntityTwo = null;
    button.editProperties({isActive: false});
    isActive = false;
    init();
}

function onClicked() {
    if (!isActive) {
        parentEntities();
        button.editProperties({isActive: true});
        Script.setTimeout(deleteEntities, 9000);
    }
}

function parentEntities() {
    Entities.editEntity(avatarEntityOne, {parentID: avatarEntityTwo});
    Entities.editEntity(avatarEntityTwo, {parentID: avatarEntityOne});
}

function init() {
    var entityOneProperties = {
        name: "entityOne",
        type: "Sphere",
        position: putEntityAcrossFromAvatar(MyAvatar)
    };

    var entityTwoProperties = {
        name: "entityTwo",
        type: "Box",
        position: putEntityAcrossFromAvatar(MyAvatar)
    };
    if (!avatarEntityOne) {
        avatarEntityOne = Entities.addEntity(entityOneProperties);
    }

    if (!avatarEntityTwo) {
        avatarEntityTwo = Entities.addEntity(entityTwoProperties);
    }
}

button.clicked.connect(onClicked);

function cleanup() {
    Entities.deleteEntity(avatarEntityOne);
    Entities.deleteEntity(avatarEntityTwo);

    if (tablet) {
        tablet.removeButton(button);
    }
}

init();
Script.scriptEnding.connect(cleanup);
