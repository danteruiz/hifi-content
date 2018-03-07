var MOTOR_WALK = 1.0;
var MOTOR_JOG = 2.0;
var MOTOR_RUN = 5.0;
var MOTOR_JUMP = 2.0;
var IMPULSE_JUMP = 100;
var MOTOR_INPUT_RUN_LIMIT = 0.985;
var MOTOR_INPUT_JOG_LIMIT = 0.6;
var MOTOR_INPUT_WALK_LIMIT = 0.15;

var MOTOR_TIMESCALE = 0.25;
var MOTOR_TIMESCALE_MAX = 1000000.0;
var MOTOR_TIMESCALE_MULTIPLIER = 2.5;
var MOTOR_VECTOR_ZERO = {x: 0, y: 0, z: 0};
var motorVector = MOTOR_VECTOR_ZERO;
MyAvatar.motorReferenceFrame = "camera";

var fwd = false;
var back = false;
var shift = false;
var motorActive = false;
var isActive = true;

var Vive = Controller.Hardware.Vive;
var controllerMapping;
var controllerMappingName;

var ROOT = "http://mpassets.highfidelity.com/0df3dbd8-42b7-4c7c-8637-58ef10bb05db-v1/";
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var icon = ROOT + "floofSprint_off.svg";
var activeIcon = ROOT + "floofSprint_on.svg";
var activeButton = tablet.addButton({
    icon: icon,
    activeIcon: activeIcon,
    text: "SPRINT",
    isActive: true,
    sortOrder: 0
});

Script.scriptEnding.connect(function () {
    tablet.removeButton(activeButton);
});

var toggle = function () {
    isActive = !isActive;
    activeButton.editProperties({isActive: isActive});
    if (isActive) {
        Controller.enableMapping(controllerMappingName);
    }
    else {
        Controller.disableMapping(controllerMappingName);
        motorActive = true;
        setMotorZ(false, 0);
    }
};

Script.scriptEnding.connect(function () {
    Controller.disableMapping(controllerMappingName);
});

activeButton.clicked.connect(toggle);

function setMotorY(motorDir) {
    MyAvatar.motorTimescale = MOTOR_TIMESCALE;
    MyAvatar.motorVelocity = {x: motorVector.x, y: motorDir * MOTOR_TIMESCALE_MULTIPLIER, z: motorVector.z};
}

function setMotorZ(motorOn, motorZ) {
    if (motorOn) {
        var motorDir = {x: 0, y: 0, z: motorZ};
        if (!motorActive || (motorVector.z != (motorZ * MOTOR_TIMESCALE_MULTIPLIER))) {
            motorVector = Vec3.multiply(motorDir, MOTOR_TIMESCALE_MULTIPLIER);
            MyAvatar.motorTimescale = MOTOR_TIMESCALE;
            MyAvatar.motorVelocity = motorVector;
            motorActive = true;
        }
    }
    else {
        if (motorActive) {
            MyAvatar.motorTimescale = MOTOR_TIMESCALE_MAX;
            MyAvatar.motorVelocity = MOTOR_VECTOR_ZERO;
            motorVector = MOTOR_VECTOR_ZERO;
        }
        motorActive = false;
        MyAvatar.setThrust(MOTOR_VECTOR_ZERO);
    }
}


function motorInput(value) {
    if(MyAvatar.isFlying()) {
        MyAvatar.motorReferenceFrame = "camera";
    } else if(!MyAvatar.isFlying()) {
        MyAvatar.motorReferenceFrame = "avatar";
    }
    if (Vive && Controller.getValue(Controller.Standard.LS) == 0) {
        if (motorActive) {
            setMotorZ(false, 0);
        }
        return;
    }
    if (value < -MOTOR_INPUT_RUN_LIMIT) {
        setMotorZ(true, MOTOR_RUN);
    }
    else if (value < -MOTOR_INPUT_JOG_LIMIT && value > -MOTOR_INPUT_RUN_LIMIT) {
        setMotorZ(true, MOTOR_JOG);
    }
    else if (value < -MOTOR_INPUT_WALK_LIMIT && value > -MOTOR_INPUT_JOG_LIMIT) {
        setMotorZ(true, MOTOR_WALK);
    }
    else if (value > MOTOR_INPUT_RUN_LIMIT) {
        setMotorZ(true, -MOTOR_RUN);
    }
    else if (value > MOTOR_INPUT_JOG_LIMIT && value < MOTOR_INPUT_RUN_LIMIT) {
        setMotorZ(true, -MOTOR_JOG);
    }
    else if (value > MOTOR_INPUT_WALK_LIMIT && value < MOTOR_INPUT_JOG_LIMIT) {
        setMotorZ(true, -MOTOR_WALK);
    }
    else {
        setMotorZ(false, 0);
    }
}


controllerMappingName = 'Hifi-FloofSprint-Mapping';
controllerMapping = Controller.newMapping(controllerMappingName);

function empty(val) {
}


controllerMapping.from(Controller.Hardware.Keyboard.W).to(function (value) {
    if (value != 0) {
        MyAvatar.motorReferenceFrame = "avatar";
        fwd = true;
        if (shift) {
            setMotorZ(true, MOTOR_RUN);
        }
        else {
            setMotorZ(true, MOTOR_WALK);
        }
    }
    else {
        fwd = false;
        setMotorZ(false, 0);
    }
});

controllerMapping.from(Controller.Hardware.Keyboard.S).to(function (value) {
    if (value != 0) {
        MyAvatar.motorReferenceFrame = "avatar";
        back = true;
        if (shift) {
            setMotorZ(true, -MOTOR_RUN);
        }
        else {
            setMotorZ(true, -MOTOR_WALK);
        }
    }
    else {
        back = false;
        setMotorZ(false, 0);
    }
});

controllerMapping.from(Controller.Hardware.Keyboard.Shift).to(function (value) {
    if (value != 0) {
        if (fwd) {
            setMotorZ(true, MOTOR_RUN);
        }
        else if (back) {
            setMotorZ(true, -MOTOR_RUN);
        }
        shift = true;
    }
    else {
        if (fwd) {
            setMotorZ(true, MOTOR_WALK);
        }
        else if (back) {
            setMotorZ(true, -MOTOR_WALK);
        }
        shift = false;
    }
});

controllerMapping.from(Controller.Hardware.Keyboard.E).to(function (value) {
    if (value != 0) {
        setMotorY(MOTOR_JUMP);
        var dir = Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: IMPULSE_JUMP, z: 0});
        MyAvatar.setThrust(dir);
    }
    else {
        setMotorY(0);
    }
});

controllerMapping.from(Controller.Hardware.Keyboard.C).to(function (value) {
    if (value != 0) {
        setMotorY(-MOTOR_JUMP);
        var dir = Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: -IMPULSE_JUMP, z: 0});
        MyAvatar.setThrust(dir);
    }
    else {
        setMotorY(0);
    }
});

controllerMapping.from(Controller.Standard.LY).to(motorInput);
controllerMapping.from(Controller.Standard.LeftPrimaryThumb).to(empty);

Controller.enableMapping(controllerMappingName);
Script.scriptEnding.connect(function () {
    Controller.disableMapping(controllerMappingName);
});


Script.scriptEnding.connect(function () {
    activeButton.clicked.disconnect(toggle);
    tablet.removeButton(activeButton);
    Controller.disableMapping(controllerMappingName);
});
