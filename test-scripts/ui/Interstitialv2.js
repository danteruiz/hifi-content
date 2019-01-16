(function() {
    var sphereEntity = Entities.addEntity({
        type: "Model",
        dimensions: { x: 3, y: 3, z: 3 },
        parentID: MyAvatar.sessionUUID,
        position: MyAvatar.position,
        modelURL: Script.resourcesPath() + "/meshes/invertedSphere.fbx"
    }, "local");


    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(sphereEntity);
    });
}());
