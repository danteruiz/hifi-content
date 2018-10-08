// thirdPersonCamera

(function() {
    var GAME_PAD = Controller.Hardware.GamePad;
    var KEYBOARD = Controller.Hardware.Keyboard;
    Camera.mode = "independent";

    function resetCameraPosition() {
        var myAvatarPosition = MyAvatar.position;
        var myAvatarOrientation = MyAvatar.orientation;

        var myAvatarFront = Quat.getFront(myAvatarOrientation);
        var cameraPosition = Vec3.sum(myAvatarPosition, Vec3.multiply(-2, myAvatarFront));

        Camera.position = cameraPosition;
    }

    resetCameraPosition();

    var gamepadMapping = Controller.newMapping("ThirdPersonCamera");
    /*gamepadMapping.from(GAME_PAD.R3).to(function(clicked) {
	    if (clicked) {
	    }
    });

    gamepadMapping.from(GAME_PAD.Cross).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.Triangle).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.Square).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.Circle).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.Select).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.Start).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.R2).to(function(clicked) {
        print(clicked);
    });

    gamepadMapping.from(GAME_PAD.RX).to(function(clicked) {
        print("RX: " + clicked);
    });*/

    gamepadMapping.from(KEYBOARD.MiddleMouseClicked).to(function(pressed) {
        print("MiddleMouseClicked: " + pressed);
    });

    gamepadMapping.from(KEYBOARD.MouseMoveLeft).to(function(value) {
        print("MouseMoveLeft: " + value);
    });

    gamepadMapping.from(KEYBOARD.MouseMoveRight).to(function(value) {
        print("MouseMoveRight: " + value);
    });

    gamepadMapping.from(KEYBOARD.MouseMoveUp).to(function(value) {
    });

    gamepadMapping.from(KEYBOARD.MouseMoveDown).to(functino(value) {
    });

    gamepadMapping.enable();
    // print(JSON.stringify(Controller.Hardware.GamePad));


    Script.scriptEnding.connect(function() {
        Camera.mode = "first person";
    });
}());
