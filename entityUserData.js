var entity = null;

var grabbableColor = {red: 0, green: 255, blue: 0};
var unGrabbableColor = {red: 255, green: 0, blue: 0};
var grabbable = false;

var data = {
    color: grabbable,
    grabbableKey: {
        test: true}
};


function putEntityAcrossFromAvatar(avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function createEntity() {
    var properties = {
        name: "blackListEntity",
        type: "Sphere",
        position: putEntityAcrossFromAvatar(MyAvatar),
        dimensions: {x: 1, y: 1, z: 1},
        grabbable: grabbable,
        color: unGrabbableColor,
        userData: JSON.stringify(data)
    };

    if (!entity) {
        entity = Entities.addEntity(properties);
    }
}

function toggleGrabbable() {
    grabbable = !grabbable;
    var userData = JSON.parse(Entities.getEntityProperties(entity).userData);
    if (grabbable) {
        var properties = {
            userData: JSON.stringify(userData),
            color: grabbableColor
        };
        Entities.editEntity(entity, properties);
    } else {
        var properties = {
            userData: JSON.stringify(userData),
            color: unGrabbableColor
        };
        Entities.editEntity(entity, properties);
    }

    var entityProperties = Entities.getEntityProperties(entity);
    print("UserData: " + entityProperties.userData);
}

function cleanup() {
    Entities.deleteEntity(entity);
    entity = null;
}


Controller.keyPressEvent.connect(function(event) {
    if (event.key === 71) {
        toggleGrabbable();
    }
});

createEntity();

Script.scriptEnding.connect(cleanup);
