(function() {
     var anchor = Overlays.addOverlay("sphere", {
        "solid": true,
        "grabbable": true,
        "position": calculateKeyboardPosition(),
        "dimensions": {x: 0.01, y: 0.01, z: 0.01},
        "ignoreRayIntersection": false,
    });

    var secondKey = Overlays.addOverlay("sphere", {
        "solid": true,
        "parentID": anchor,
        "visible": true,
        "alpha": 0.7,
        "localPosition": {x: 0.05, y: 0.0, z: 0.0},
         "dimensions": {
                    "x": 0.04787999764084816,
                    "z": 0.02051999792456627,
                    "y": 0.04787999764084816
         },
        "localOrientation": {
            "w": 0.707,
            "x": 0.000,
            "y": 0.707,
            "z": 0.000
        },
        "ignoreRayIntersection": false
    });
}());
