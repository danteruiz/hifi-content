var entity = null;

function putEntityAcrossFromAvatar(avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

function init() {
    var properties = {
        name: "testControl",
        type: "Sphere",
        position: putEntityAcrossFromAvatar(MyAvatar),
        dimensions: {x: 1, y: 1, z: 1},
        parentID: MyAvatar.sessionUUID
    };

    if (!entity) {
        entity = Entities.addEntity(properties, true);
        print(entity);
    }
}

function checkEntityParent() {
    if (entity) {
        var properties = Entities.getEntityProperties(entity);
        if (properties.parentID !== MyAvatar.sessionUUID) {
            //print("parent not the same");
        }
    }
    Script.setTimeout(checkEntityParent, 200);
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

var MAPPING_NAME = "control";
var controlMapping = Controller.newMapping(MAPPING_NAME);
controlMapping.from(Controller.Hardware.Keyboard.Shift).peek().to(function(value) {
    setRandomColor();
});
Controller.enableMapping(MAPPING_NAME);

init();
Script.scriptEnding.connect(cleanup);
Script.setTimeout(checkEntityParent, 200);
