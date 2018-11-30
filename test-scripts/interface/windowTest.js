(function() {
    var laserPonter = null;
    var COLORS_GRAB_SEARCHING_HALF_SQUEEZE = { red: 10, green: 10, blue: 255 };
    var COLORS_GRAB_SEARCHING_FULL_SQUEEZE = { red: 250, green: 10, blue: 10 };
    var COLORS_GRAB_DISTANCE_HOLD = { red: 238, green: 75, blue: 214 };
    var AVATAR_SELF_ID = "{00000000-0000-0000-0000-000000000001}";
    var DEFAULT_SEARCH_SPHERE_DISTANCE = 1000; // how far from camera to search intersection?

    var halfPath = {
        type: "line3d",
        color: COLORS_GRAB_SEARCHING_HALF_SQUEEZE,
        visible: true,
        alpha: 1,
        solid: true,
        glow: 1.0,
        lineWidth: 5,
        ignoreRayIntersection: true, // always ignore this
        drawInFront: true, // Even when burried inside of something, show it.
        parentID: AVATAR_SELF_ID
    };
    var halfEnd = {
        type: "sphere",
        solid: true,
        color: COLORS_GRAB_SEARCHING_HALF_SQUEEZE,
        alpha: 0.9,
        ignoreRayIntersection: true,
        drawInFront: true, // Even when burried inside of something, show it.
        visible: true
    };
    var fullPath = {
        type: "line3d",
        color: COLORS_GRAB_SEARCHING_FULL_SQUEEZE,
        visible: true,
        alpha: 1,
        solid: true,
        glow: 1.0,
        lineWidth: 5,
        ignoreRayIntersection: true, // always ignore this
        drawInFront: true, // Even when burried inside of something, show it.
        parentID: AVATAR_SELF_ID
    };
    var fullEnd = {
        type: "sphere",
        solid: true,
        color: COLORS_GRAB_SEARCHING_FULL_SQUEEZE,
        alpha: 0.9,
        ignoreRayIntersection: true,
        drawInFront: true, // Even when burried inside of something, show it.
        visible: true
    };
    var holdPath = {
        type: "line3d",
        color: COLORS_GRAB_DISTANCE_HOLD,
        visible: true,
        alpha: 1,
        solid: true,
        glow: 1.0,
        lineWidth: 5,
        ignoreRayIntersection: true, // always ignore this
        drawInFront: true, // Even when burried inside of something, show it.
        parentID: AVATAR_SELF_ID
    };

    var renderStates = [
        {name: "half", path: halfPath, end: halfEnd},
        {name: "full", path: fullPath, end: fullEnd},
        {name: "hold", path: holdPath}
    ];

    var defaultRenderStates = [
        {name: "half", distance: DEFAULT_SEARCH_SPHERE_DISTANCE, path: halfPath},
        {name: "full", distance: DEFAULT_SEARCH_SPHERE_DISTANCE, path: fullPath},
        {name: "hold", distance: DEFAULT_SEARCH_SPHERE_DISTANCE, path: holdPath}
    ];

    function updateLaserPointer() {
    }
    
    function update() {
        var reticlePosition = Reticle.position;
        var pointOnWindow = Window.isPointOnDesktopWindow(reticlePosition);
    }

    function init() {
        laserPointer = LaserPointers.createLaserPointer({
            joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
            filter: RayPick.PICK_HUD,
            maxDistance: 500,
            renderStates: renderStates,
            faceAvatar: true,
            defaultRenderStates: defaultRenderStates
        });
         LaserPointers.setRenderState(laserPointer, "full");
        LaserPointers.enableLaserPointer(laserPointer);
        print("---------> enable <------------")
    }
    //init();
    Script.update.connect(update);
})();
