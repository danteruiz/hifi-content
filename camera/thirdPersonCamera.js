// thirdPersonCamera

(function() {
    var GAME_PAD = Controller.Hardware.GamePad;
    var KEYBOARD = Controller.Hardware.Keyboard;
    const FIRST_PERSON = "first person";
    const INDIE = "independent";

    function resetCameraPosition() {
        var myAvatarPosition = MyAvatar.position;
        var myAvatarOrientation = MyAvatar.orientation;

        var myAvatarFront = Quat.getFront(myAvatarOrientation);
        var cameraPosition = Vec3.sum(myAvatarPosition, Vec3.multiply(-2, myAvatarFront));

        Camera.position = cameraPosition;
    }

    resetCameraPosition();


    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var buttonProps = {
        text: "3D Cam"
    };

    var TWO_PI = 6.283;
    var THRESHOLD = 0.09;
    var PI = 3.142;
    var bloom = -5; // meters

    var YAW_SPEED = TWO_PI / 3.0;
    var PITCH_SPEED = TWO_PI / 3.0;

    var yawOffset = 0.0;
    var pitchOffset = 0.0;
    var valueRX = 0.0;
    var valueRY = 0.0;


    var originalOrientation = MyAvatar.orientation;

    var button = tablet.addButton(buttonProps);
    button.clicked.connect(onClicked);

    var mappingEnabled = false;
    function onClicked() {
        if (mappingEnabled) {
            originalOrientation = MyAvatar.orientation;
            yawOffset = 0.0;
            pitchOffset = 0.0;
            Camera.mode = FIRST_PERSON;
            Script.update.disconnect(update);
            gamepadMapping.disable();
        } else {
            Camera.mode = INDIE;
            Script.update.connect(update);
            gamepadMapping.enable();
        }
        mappingEnabled = !mappingEnabled;
        button.editProperties({
            isActive: mappingEnabled
        });
    }


    function update(deltaTime) {
        // update myavatar
        // update camera
        var deltaYaw = valueRX * YAW_SPEED * deltaTime;
        var deltaPitch = valueRY * PITCH_SPEED * deltaTime;

        pitchOffset += deltaPitch;
        yawOffset += deltaYaw;
        var negZDirection = Vec3.multiplyQbyV(Quat.multiply(originalOrientation, Quat.fromVec3Radians({x: pitchOffset, y: yawOffset, z: 0.0})), Vec3.UNIT_NEG_Z);
        Camera.position = Vec3.sum(MyAvatar.position, Vec3.multiply(bloom, negZDirection));
        Camera.orientation = Quat.multiply(originalOrientation, Quat.fromVec3Radians({x: pitchOffset, y: yawOffset, z: 0.0}));
    }

    var gamepadMapping = Controller.newMapping("ThirdPersonCamera");
    gamepadMapping.from(GAME_PAD.R3).to(function(clicked) {
	    if (clicked) {
	    }
    });

    gamepadMapping.from(GAME_PAD.Cross).to(function(pressed) {
    });

    gamepadMapping.from(GAME_PAD.Triangle).to(function(pressed) {
    });

    gamepadMapping.from(GAME_PAD.Square).to(function(pressed) {
    });

    gamepadMapping.from(GAME_PAD.Circle).to(function(pressed) {
    });

    gamepadMapping.from(GAME_PAD.Select).to(function(pressed) {
    });

    gamepadMapping.from(GAME_PAD.Start).to(function(pressed) {
    });

    gamepadMapping.from(GAME_PAD.R2).to(function(value) {
    });

    gamepadMapping.from(GAME_PAD.LX).to(function(value) {
    });

    gamepadMapping.from(GAME_PAD.LY).to(function(value) {
    });

    gamepadMapping.from(GAME_PAD.RX).to(function(value) {
        valueRX = (Math.abs(value) > THRESHOLD) ? value : 0.0;
    });

    gamepadMapping.from(GAME_PAD.RY).to(function(value) {
        valueRY = (Math.abs(value) > THRESHOLD) ? value : 0.0;
    });

    Script.scriptEnding.connect(function() {
        Camera.mode = FIRST_PERSON;

        if (button) {
            button.clicked.connect(onClicked);
        }

        tablet.removeButton(button);
        gamepadMapping.disable();
    });
}());
