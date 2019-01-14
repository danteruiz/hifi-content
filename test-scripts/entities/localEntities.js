(function() {
    var cubeEntity  = Entities.addEntity({
        type: "Box",
        name: "localCubeEntity",
        parentID: MyAvatar.sessionUUID,
        localPosition: { x: 0, y: 0, z: 0 },
        position: MyAvatar.position,
        dimensions: {x: 1, y: 1, z: 1}
    }, "local");


    var zoneEntity = Entities.addEntity({
        type: "Zone",
        name: "localZoneEntity",
        parentID: MyAvatar.sessionUUID,
        localPosition: { x: 0, y: 0, z: 0 },
        dimensions: { x: 1.0, y: 1.0, z: 1.0 },
        position: MyAvatar.position,
        skyboxMode: "enabled",
        skybox: {
            color: "red"
        },
    }, "local");

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(cubeEntity);
        Entities.deleteEntity(zoneEntity);
    });
}());
