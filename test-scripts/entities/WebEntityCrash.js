(function () {

    var GIF_DESKTOP_URL = "https://giphy.com/gifs/nL45dgV3HkVBeI7xe1/html5";
    var MAX_LIFE_TIME = 5000; // 5 seconds
    function WebEntity(previousPosition, createWebOverlay) {
        this.lifeTime = 0;
        this.isOverlay = createWebOverlay;
        this.position = Vec3.sum(previousPosition, { x: 2.0, y: 0.0, z: 0.0 });
        this.webEntity = !createWebOverlay ? Entities.addEntity({
            name: "webEntityTest",
            localEntity: true,
            type: "Web",
            dimensions: { x: 3.2, y: 1.7, z: 0.009 },
            position: Vec3.sum(previousPosition, { x: 2.0, y: 0.0, z: 0.0 }),
            sourceUrl: GIF_DESKTOP_URL
        }) : Overlays.addOverlay("web3d", {
            dimensions: { x: 3.2, y: 1.7, z: 0.009 },
            position: Vec3.sum(previousPosition, { x: 2.0, y: 0.0, z: 0.0 }),
            url: GIF_DESKTOP_URL
        });


        this.cleanup = function() {
            this.isOverlay ? Overlays.deleteOverlay(this.webEntity) : Entities.deleteEntity(this.webEntity);
        };
    }
    var MAX_WEB_ENTITIES = 4;
    var MILISEONDS_PRE_SEC = 1000;
    var webEntities = [];

    var isWeb = false;
    var totalTime = 0;
    Script.update.connect(function(deltaTime) {
        if (webEntities.length <= MAX_WEB_ENTITIES) {
            // update the current timestamp of the webEnitites

            webEntities.forEach(function(webEntity) {
                webEntity.lifeTime += deltaTime * MILISEONDS_PRE_SEC;
            });

            if (webEntities.length === 0) {
                webEntities.push(new WebEntity(MyAvatar.position, isWeb));
            } else {
                webEntities.push(new WebEntity(webEntities[webEntities.length - 1].position, isWeb));
            }
        }

        isWeb = !isWeb;
    });

    Script.scriptEnding.connect(function() {
        webEntities.forEach(function(webEntity) {
            webEntity.cleanup();
        });
    });
}());
