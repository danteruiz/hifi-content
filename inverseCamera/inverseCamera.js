(function() {

    var inverseMapping = Controller.newMapping("inverseCamera");

    inverseMapping.from(Controller.Hardware.Keyboard.MouseMoveDown).when(Controller.Hardware.Keyboard.RightMouseButton).to(Controller.Actions.PITCH_UP);
    inverseMapping.from(Controller.Hardware.Keyboard.MouseMoveUp).when(Controller.Hardware.Keyboard.RightMouseButton).to(Controller.Actions.PITCH_DOWN);
    inverseMapping.enable();
    Script.scriptEnding.connect(function() {
        inverseMapping.disable();
    });
}());
