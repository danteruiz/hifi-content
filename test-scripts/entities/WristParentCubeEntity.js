(function() {
    var cubeEntity = Entities.addEntity({
        name: "WristCubeEntity",
        localEntity: true,
        parentID: MyAvatar.sessionUUID,
    });

    var avatarJoints = MyAvatar.getJointNames();

    avatarJoints.forEach(function(jointName) {
        print(jointName);
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(cubeEntity);
    });
}());
