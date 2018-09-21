//drawStylusPoint.js

(function() {

    var debugOverlay = Overlays.addOverlay("sphere", {
        solid: true,
        color: {red: 255, blue: 0, green: 0},
        dimensions: {x: 0.003, y: 0.003, z: 0.003},
        ignoreRayIntersection: true,
        visible: true,
        alpha: 1.0
    });

    function mouseMoveOnOverlay(overlayID, event) {
        if (event.button === "Primary") {
            var pickResult = Pointers.getPrevPickResult(event.id);
            Overlays.editOverlay(debugOverlay, {"position": pickResult.stylusTip.position});
        }
    }

    Overlays.mouseMoveOnOverlay.connect(mouseMoveOnOverlay);

    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(debugOverlay);
    });
}());
