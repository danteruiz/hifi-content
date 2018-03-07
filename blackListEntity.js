var entity = null;


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
        dynamic: true
    };

    if (!entity) {
        entity = Entities.addEntity(properties);
    }
}

function sendMessage(action) {
    var message = {
        action: action,
        id: entity
    };
    Messages.sendLocalMessage("Hifi-Hand-RayPick-Blacklist", JSON.stringify(message));
}

function random() {
    return Math.floor((Math.random() * 255));
}

function setRandomColor() {
    if (entity) {
        var color = {
            red: random(),
            green: random(),
            blue: random()
        };

        var properties = {
            color: color
        };

        Entities.editEntity(entity, properties);
    }
}

function cleanup() {
    Entities.deleteEntity(entity);
    entity = null;
}

Entities.mousePressOnEntity.connect(function(id, event) {
    if (id === entity) {
        print(id);
        setRandomColor();
    }
});

Controller.keyPressEvent.connect(function(event) {
    if (event.key === 73) { // if 'i' button is pressed
    } else if (event.key === 82) { // if 'r' button is pressed
        sendMessage("remove");
    }
});

createEntity();

Script.scriptEnding.connect(cleanup);
