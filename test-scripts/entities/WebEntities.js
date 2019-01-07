(function() {
    var webEntity = Entities.addEntity({
        type: "Web",
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(Quat.getFront(MyAvatar.orientation), 3.0)),
        sourceUrl: "www.google.com",
        dimensions: { x: 1.0, y: 1.0, z: 1.0 },
    });

    var cubeEntity = Entities.addEntity({
        name: "dante",
        type: "Box",
        position: Vec3.sum(MyAvatar.position, Vec3.multiply(Quat.getRight(MyAvatar.orientation), 3.0)),
        dimensions: { x: 1.0, y: 1.0, z: 1.0 },
    });


    Script.update.connect(function() {
        var cubeProperties = Entities.getEntityProperties(cubeEntity);
        //print("ignoreForCollisions: " + cubeProperties.ignoreForCollisions);
    });


    Entities.mousePressOnEntity.connect(function(entityID, pointerEvent) {
        if (entityID === webEntity) {
            print("ClICKED ON WEB ENTITY");
        }

        if (entityID === cubeEntity) {
            print("CLICKED ON CUBE ENTITY");
        }
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(webEntity);
        Entities.deleteEntity(cubeEntity);
    });
}());
