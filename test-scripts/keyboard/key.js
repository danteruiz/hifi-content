(function() {
    var key = Entities.addEntity({
        name: "testKey",
        modelURL: Script.resourcesPath() + "meshes/keyboard/SM_key.fbx",
        textures: JSON.stringify({
            "file9": Script.resourcesPath() + "meshes/keyboard/key_w.png",
            "file10": Script.resourcesPath() + "meshes/keyboard/key_w.png"
        }),
        //position: Vec3.sum(MyAvatar.position, Vec3.multiply(2.0, Quat.getFront(MyAvatar.orientation))),
        dimensions: {
            x: 0.04787999764084816,
            z: 0.02051999792456627,
            y: 0.04787999764084816
        }
    });


    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(key);
    });

    print(Script.resourcesPath() + "meshes/keyboard/SM_key.fbx");
}());
