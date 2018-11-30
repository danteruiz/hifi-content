(function() {

    var grayFox = Entities.addEntity({
        type: "Model",
        name: "GrayFox",
        modelURL: "file:///C:/Users/Dante/Documents/MGS_Dock/floor.fbx",
        position: MyAvatar.getHeadPosition()
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(grayFox);
    });
}());
