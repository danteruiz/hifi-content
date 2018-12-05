(function() {
    var SEARCH_SPHERE_SIZE = 0.0132;
    var COLORS_GRAB_SEARCHING_HALF_SQUEEZE = { red: 10, green: 10, blue: 255 };
    var COLORS_GRAB_SEARCHING_FULL_SQUEEZE = { red: 250, green: 10, blue: 10 };
    var COLORS_GRAB_DISTANCE_HOLD = { red: 238, green: 75, blue: 214 };
    var DEFAULT_SEARCH_SPHERE_DISTANCE = 1000;

    var dim = {x: SEARCH_SPHERE_SIZE, y: SEARCH_SPHERE_SIZE, z: SEARCH_SPHERE_SIZE};
    var halfPath = {
        type: "line3d",
        color: COLORS_GRAB_SEARCHING_HALF_SQUEEZE,
        visible: true,
        alpha: 1,
        solid: true,
        glow: 1.0,
        ignoreRayIntersection: true, // always ignore this
        drawInFront: false, // Even when burried inside of something, show it.
        drawHUDLayer: false,
    };
    var halfEnd = {
        type: "sphere",
        dimensions: dim,
        solid: true,
        color: COLORS_GRAB_SEARCHING_HALF_SQUEEZE,
        alpha: 0.9,
        ignoreRayIntersection: true,
        drawInFront: false, // Even when burried inside of something, show it.
        drawHUDLayer: false,
        visible: true
    };
    var fullPath = {
        type: "line3d",
        color: COLORS_GRAB_SEARCHING_FULL_SQUEEZE,
        visible: true,
        alpha: 1,
        solid: true,
        glow: 1.0,
        ignoreRayIntersection: true, // always ignore this
        drawInFront: false, // Even when burried inside of something, show it.
        drawHUDLayer: false,
    };
    var fullEnd = {
        type: "sphere",
        dimensions: dim,
        solid: true,
        color: COLORS_GRAB_SEARCHING_FULL_SQUEEZE,
        alpha: 0.9,
        ignoreRayIntersection: true,
        drawInFront: false, // Even when burried inside of something, show it.
        drawHUDLayer: false,
        visible: true
    };
    var holdPath = {
        type: "line3d",
        color: COLORS_GRAB_DISTANCE_HOLD,
        visible: true,
        alpha: 1,
        solid: true,
        glow: 1.0,
        ignoreRayIntersection: true, // always ignore this
        drawInFront: false, // Even when burried inside of something, show it.
        drawHUDLayer: false,
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
  
    var pointer = Pointers.createPointer(PickType.Ray, {
        joint: "_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND",
        filter: Picks.PICK_OVERLAYS,
        triggers: [{action: Controller.Standard.LTClick, button: "Focus"}, {action: Controller.Standard.LTClick, button: "Primary"}],
        hover: true,
        scaleWithParent: true,
        distanceScaleEnd: true,
        renderStates: renderStates,
        defaultRenderStates: defaultRenderStates,
        hand: 1
    });

    Pointers.setRenderState(pointer, "full");
    Pointers.enablePointer(pointer);
    Keyboard.setRightHandLaser(pointer);

    Script.scriptEnding.connect(function() {
        Pointers.removePointer(pointer);
    });
}());
