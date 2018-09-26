// KeyboardPlacement.js

(function() {
    var DEFAULT_KEY_MODEL = "https://hifi-content.s3.amazonaws.com/DomainContent/production/default-image-model.fbx";
    var anchor = Overlays.addOverlay("sphere", {
        solid: true,
        grabbable: true,
        visible: false,
        dimensions: {x: 0.1, y: 0.1, z: 0.1},
    });

    var firstKey = Overlays.addOverlay("model", {
        url: DEFAULT_KEY_MODEL,
        parentID: anchor,
        grabbable: false,
        localPosition: {x: 0.1, y: 0.0, z: 0.0 },
        dimensions: { x: 0.04, y: 0.04, z: 0.009 },
        ignoreRayIntersection: true,
        visible: false
    });


    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(anchor);
        Overlays.deleteOverlay(firstKey);
    });
}());
