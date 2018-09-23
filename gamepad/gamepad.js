// gamepad.js

(function() {
    var index = 0;
    var views = ["first person", "third person"];
    Camera.mode = "independent";

    // Camera.position = MyAvatar.position;
    function toggleViews() {
	index = (index + views.length + 1) % views.length;
	Camera.mode = views[index];
    }

    var gamepadMapping = Controller.newMapping("gamepad");
    gamepadMapping.from(Controller.Hardware.GamePad.R3).to(function(clicked) {
	if (clicked) {
	    toggleViews();
	}
    });

    gamepadMapping.enable();
    print(JSON.stringify(Controller.Hardware.GamePad));


    Script.scriptEnding.connect(function() {
    });
}());
