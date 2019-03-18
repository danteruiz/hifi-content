(function() {
    var LOCAL_TABLET_MODEL_PATH = Script.resourcesPath() + "meshes/tablet-with-home-button-small-bezel.fbx";

    var modelEntity = Entities.addEntity({
        type: "Model",
        modelURL: LOCAL_TABLET_MODEL_PATH,
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(1, Quat.getFront(MyAvatar.orientation))),
    }, "local");

    var scale = 0.3
    var accend = true;
    Script.update.connect(function(deltaTime) {

        if (accend) {
            scale += deltaTime;
        } else {
            scale -= deltaTime;
        }

        if (scale < 0.3) {
            accend = true;
        } else if (scale > 1.2) {
            accend = false;
        }
        Entities.editEntity(modelEntity, { modelScale: {x: scale, y: 0.3, z: 0.3}});
        print("---->");
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(modelEntity);
    });

}());
