(function() {
    Overlays.mousePressOnOverlay.connect(function(overlayID, event) {
        var modelURL = Overlays.getProperty(overlayID, "modelURL");

        print(modelURL + "\n");
    });
}());
