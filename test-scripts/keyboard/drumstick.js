// drustick.js

(function() {
    var DRUM_STICK = Script.resourcesPath() + "meshes/drumstick.fbx";
    var sensorToWorldScale = MyAvatar.getSensorToWorldScale();
    var LENGTH = 0.3;

    function calculateKeyboardPosition() {
        var headPosition = MyAvatar.getHeadPosition();
        var position = Vec3.sum(headPosition, Vec3.multiply(0.5, Quat.getFront(MyAvatar.orientation)));
        return position;
    }

    var model = Overlays.addOverlay("model", {
        name: "drumstick",
        url: DRUM_STICK,
        solid: true,
        position: calculateKeyboardPosition(),
        dimensions: Vec3.multiply(sensorToWorldScale, {x: 0.05, y: 0.4, z: 0.05})
    });


    print(JSON.stringify(Overlays.getProperty(model, "dimensions")));

    Script.scriptEnding.connect(function() {
        print("----->script");
        print(JSON.stringify(Overlays.getProperty(model, "dimensions")));
        Overlays.deleteOverlay(model);
    });
}());
