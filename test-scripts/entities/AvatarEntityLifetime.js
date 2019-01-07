(function() {
    var avatarEntity = Entities.addEntity({
        type: "Model",
        modelURL: "http://hifi-content.s3.amazonaws.com/alan/dev/Cowboy-hat.fbx?2",
        shapeType: "simple-hull",
        localPosition: { x:0, y:0.2, z:0 },
        name: "hat",
        dynamic: false,
        collisionless: true,
        parentID: MyAvatar.sessionUUID,
        parentJointIndex: MyAvatar.getJointIndex("Head"),
        //lifetime: 300,
        dimensions: { x: 0.3239, y: 0.15, z: 0.3779 }
    }, true);

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(avatarEntity);
    });
    print("----------------->");
}());
