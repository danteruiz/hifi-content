(function() {
    var cubeOverlay = Overlays.addOverlay("cube", {
        name: "cubeTest",
        position: Vec3.sum(MyAvatar.position, {x: 0.5, y: 0, z: -0.5}),
        dimensions: {x: 1.0, y: 1.0, z: 1.0},
        isSolid: true,
        keepAspectRatio: false,
        alpha: 1
    });


    var imageOverlay = Overlays.addOverlay("image3d", {
        name: "imageTest",
        position: Vec3.sum(MyAvatar.position, {x: 0.5, y: 0, z: 0.5}),
        dimensions: {x: 2.0, y: 1.0, z: 1.0},
        url: Script.resourcesPath() + "images/loadingBar_progress.png",
        alpha: 1,
        keepAspectRatio: false
    });


    var height = 92;
    var width = 1025;
    Controller.keyPressEvent.connect(function(event) {
        print(JSON.stringify(event));

        if (event.key === 82) {
            var props = {
                subImage: {
                    x: 0.0,
                    y: 0.0,
                    width: Math.floor(Math.random() * width)
                   // height: 91//Math.floor(Math.random() * height)
                }
            };

            Overlays.editOverlay(imageOverlay, props);
        }
    });


    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(imageOverlay);
        Overlays.deleteOverlay(cubeOverlay);
    });
}());
