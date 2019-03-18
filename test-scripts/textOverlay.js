(function() {
    var overlay = Overlays.addOverlay("text3d", {
        text: "this is a test"
    });

    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(overlay);
    });
}());
