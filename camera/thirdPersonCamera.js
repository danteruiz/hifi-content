// thirdPersonCamera

(function() {
    var GAME_PAD = Controller.Hardware.GamePad;
    Camera.mode = "independent";

    var gamepadMapping = Controller.newMapping("gamepad");
    gamepadMapping.from(GAME_PAD.R3).to(function(clicked) {
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
    });

    gamepadMapping.enable();
    // print(JSON.stringify(Controller.Hardware.GamePad));


    Script.scriptEnding.connect(function() {
        Camera.mode = "first person";
    });
}());
