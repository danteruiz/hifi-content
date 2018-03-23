const PACKAGE = "avatar.relative.parent.test";
const POWER = 5;
const STARTVEC = {x:500,y:500, z:500};

var parentEntity = null;
var cameraEntity = null;

function controlBuild() {
    var map = Controller.newMapping(PACKAGE);
    var Keyboard = Controller.Hardware.Keyboard;
    var Standard = Controller.Standard;
    var empty = function(){};
    map.from(Standard.LX).to(empty);
    map.from(Standard.LY).to(empty);
    map.from(Standard.RX).to(empty);
    map.from(Standard.RY).to(empty);

    map.from(Keyboard.W).to(empty);
    map.from(Keyboard.S).to(empty);
    map.from(Keyboard.A).to(empty);
    map.from(Keyboard.D).to(empty);
    map.from(Keyboard.E).to(empty);
    map.from(Keyboard.C).to(empty);

    map.from(Keyboard.Z).to(empty);
    map.from(Keyboard.X).to(empty);

    map.from(Keyboard.Up).to(empty);
    map.from(Keyboard.Down).to(empty);
    map.from(Keyboard.Left).to(empty);
    map.from(Keyboard.Right).to(empty);
    map.from(Keyboard.PgUp).to(empty);
    map.from(Keyboard.PgDown).to(empty);
}

Menu.setIsOptionChecked("Enable avatar collisions",0);
controlBuild();
// Make sure to stop any user input
function start () {
    // Hack to disable any avatar physics.
    // Rez platform to track.
    MyAvatar.position = STARTVEC;
    MyAvatar.orientation = Quat.ZERO;


    // Reticle.setVisible(false);
    Controller.enableMapping(PACKAGE, true);
    parentEntity = Entities.addEntity({type: "Box", position: STARTVEC, dimensions: {x: 1, y: 0.5, z:1 }, velocity:Vec3.ZERO, color: {red: 255, green: 0, blue: 0}, dynamic: true, angularDampening: 1.0});
    MyAvatar.setParentID(parentEntity);
    Entities.addEntity({type: "Box", position: Vec3.sum(STARTVEC,{x:0,y:0.25,z:0}), dimensions: {x: 0.125, y: 0.125, z:0.125 }, velocity:Vec3.ZERO, color: {red: 0, green: 0, blue: 255}, parentID: parentEntity, angularDampening: 1.0});

    // Rez Away to see how this looks like from a distance
    cameraEntity = Entities.addEntity({type: "Box", position: Vec3.sum(STARTVEC,{x:0,y:5,z:0}), rotation: Quat.fromVec3Degrees({x:-90,y:0,z:0}), parentID: parentEntity});
    Camera.mode = "entity";
    Camera.cameraEntity = cameraEntity;
    Script.update.connect(motor);
}

// Releases user input
function end () {
    Script.update.disconnect(motor);
    Menu.setIsOptionChecked("Enable avatar collisions",1);
    Controller.disableMapping(PACKAGE);
    Reticle.setVisible(true);
    MyAvatar.setParentID(null);
    Camera.cameraEntity = null;
    Camera.mode = "first person";
    MyAvatar.orientation = Quat.ZERO;
    Entities.deleteEntity(parentEntity);
}
var time = 0;
var motorAcceleration =  Vec3.ZERO;
function resetMotor () {
    motorAcceleration = Vec3.ZERO;
}
var syncTest = 0;
function motor (dt) {
    time += dt;
    if(Math.floor(time) % 2 === 1){
        resetMotor();
    } else if (time < 2) {
        motorAcceleration.y = 1;
    } else if (time < 4){
        motorAcceleration.y = -1;
    } else if (time < 6){
        motorAcceleration.x = 1;
    } else if (time < 8){
        motorAcceleration.x = -1;
    } else if (time  < 10){
        motorAcceleration.z = -1;
    } else if (time < 12){
        motorAcceleration.z = 1;
    } else if (time < 14){
        motorAcceleration.z = 0;
    } else if (time > 30){
        print("stopping");
        end();
        return;
    }
    syncTest += dt;
    if(syncTest > 0.125){
        // Update only every 125ms.
        var properties = Entities.getEntityProperties(parentEntity, ["velocity"]);

        var velocity = properties.velocity;
        var velocityVector = Vec3.multiply(motorAcceleration, POWER*syncTest );
        velocity = Vec3.sum(velocityVector, velocity);

        syncTest = 0;
        print(JSON.stringify(velocity));
        Entities.editEntity(parentEntity, {velocity: velocity});
    }
}

// doing in a delay to make sure we dont accidentally push the test object.
Script.setTimeout(start, 120);
