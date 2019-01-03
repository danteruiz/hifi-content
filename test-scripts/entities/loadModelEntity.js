(function() {

    function putOverlayAcrossFromAvatar() {
        var avatarRot = Quat.fromPitchYawRollDegrees(0, MyAvatar.bodyYaw, 0.0);
        var position = Vec3.sum(MyAvatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
        return position;
    }
    var modelUrl = "file:///C:/Users/Dante/Documents/Test/GrayFox.fbx";

    var modelEntity = Entities.addEntity({
        name: "TestModel",
        type: "Model",
        modelURL: modelUrl,
        localEntity: true,
        position: putOverlayAcrossFromAvatar()
    });



    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(modelEntity);
    });
}());
