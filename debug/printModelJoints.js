(function() {
    var MODEL_URL = "http://mpassets.highfidelity.com/40d879ec-93f0-4b4a-8c58-dd6349bdb058-v1/Aviator.fbx";

    var modelEntity = Entities.addEntity({
        type: "Model",
        modelURL: MODEL_URL
    });


    Script.setTimeout(function() {
        var hasAvatarJoint = false;
        var entityJointNames = Entities.getJointNames(modelEntity);
        for(var index = 0; index < entityJointNames.length; index++) {
            var avatarJointIndex = MyAvatar.getJointIndex(entityJointNames[index]);
            print(entityJointNames[index]);
            if (avatarJointIndex >= 0) {
                hasAvatarJoint = true;
            }
        }

        print("has avatar joint: " + hasAvatarJoint);
    }, 200);

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(modelEntity);
    });
}());
