(function() {
    var localWebEntity = Entities.addEntity({
        name: "localWebEntity",
        type: "Web",
        localEntity: true,
        sourceUrl: "https://www.youtube.com/watch?v=Bvl2uyEyBLo",
        position: MyAvatar.position
    });


    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(localWebEntity);
    });
}());
