"use strict";

var imageOverlay = null;

var overlayProperties = {
    "x": Window.x,
    "y": Window.y,
    "width": Window.innerWidth,
    "height": Window.innerHeight,
    "visible": true
};

imageOverlay = Overlays.addOverlay("image", overlayProperties);

Script.scriptEnding.connect(function() {
    Overlays.deleteOverlay(imageOverlay);
});
