(function() {
    var cubeEntity  = Entities.addEntity({
        type: "Box",
        name: "localCubeEntity",
        parentID: MyAvatar.sessionUUID,
        localPosition: { x: 0, y: 0, z: 0 },
        position: MyAvatar.position,
        dimensions: {x: 1, y: 1, z: 1}
    }, "local");


    MyAvatar.sessionUUIDChanged.connect(function(sessionID) {
        Entities.editEntity(cubeEntity, {
            parentID: sessionUUID
        });
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(cubeEntity);
    });
}());
