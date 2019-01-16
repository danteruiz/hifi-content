(function() {
    var sphereEntity = Entities.addEntity({
        type: "Model",
        dimensions: { x: 3, y: 3, z: 3 },
        position: MyAvatar.position,
        modelURL: Script.resourcesPath() + "/meshes/invertedSphere.fbx"
    }, "local");


    var materialEntity = Entities.addEntity({
        type: "Material",
        parentID: sphereEntity,
        materialURl: "materialData",
        priority: 1,
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                "model": "hifi_pbr",
                "albedoMap": Script.resolvePath("../../textures/interstitial.jpg"),
                "emissiveMap": Script.resolvePath("../../textures/interstitial.jpg")
            }
        })
    }, "local");


    print(Script.resolvePath("../../textures/interstitial.jpg"));


    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(sphereEntity);
        Entities.deleteEntity(materialEntity);
    });
}());
