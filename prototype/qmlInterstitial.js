(function() {
    var QML_FILE = Script.resourcesPath() + "qml/hifi/InterstitialPage.qml";
    var scriptPath = Script.resourcesPath() + "../../scripts/system/libraries/Xform.js";
    Script.include(scriptPath);

    var renderViewTask = Render.getConfig("RenderMainView");
    var toolbar = Toolbars.getToolbar("com.highfidelity.interface.toolbar.system");
    var DEFAULT_DIMENSIONS = { x: 24, y: 24, z: 24 };
    var DEFAULT_Z_OFFSET = 5.45;

    function getAnchorLocalYOffset() {
        var loadingSpherePosition = Overlays.getProperty(loadingSphereID, "position");
        var loadingSphereOrientation = Overlays.getProperty(loadingSphereID, "rotation");
        var overlayXform = new Xform(loadingSphereOrientation, loadingSpherePosition);
        var worldToOverlayXform = overlayXform.inv();
        var headPosition = MyAvatar.getHeadPosition();
        var headPositionInOverlaySpace = worldToOverlayXform.xformPoint(headPosition);
        return headPositionInOverlaySpace.y;
    }


    var loadingSphereID = Overlays.addOverlay("model", {
        name: "Loading-Sphere",
        position: Vec3.sum(Vec3.sum(MyAvatar.position, {x: 0.0, y: -1.0, z: 0.0}), Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.95, z: 0})),
        orientation: Quat.multiply(Quat.fromVec3Degrees({x: 0, y: 180, z: 0}), MyAvatar.orientation),
        url: "http://hifi-content.s3.amazonaws.com/alexia/LoadingScreens/black-sphere.fbx",
        dimensions: DEFAULT_DIMENSIONS,
        alpha: 1,
        visible: true,
        ignoreRayIntersection: true,
        drawInFront: true,
        grabbable: false,
        parentID: MyAvatar.SELF_ID
    });

    var anchorOverlay = Overlays.addOverlay("cube", {
        dimensions: {x: 0.2, y: 0.2, z: 0.2},
        visible: false,
        grabbable: false,
        ignoreRayIntersection: true,
        localPosition: {x: 0.0, y: getAnchorLocalYOffset(), z: DEFAULT_Z_OFFSET },
        orientation: Quat.multiply(Quat.fromVec3Degrees({x: 0, y: 180, z: 0}), MyAvatar.orientation),
        solid: true,
        drawInFront: true,
        parentID: loadingSphereID
    });

    var interstitialPageOverlay = Overlays.addOverlay("web3d", {
        url: QML_FILE,
        alpha: 1.0,
        localPosition: { x: 0.0, y: 0.8, z: -0.001 },
        dimensions: {x: 4, y: 3, z: 1 },
        dpi: 7,
        showKeyboardFocusHighlight: false,
        localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
        emissive: true,
        drawInFront: true,
        maxFPS: 30,
        parentID: anchorOverlay
    });


    renderViewTask.getConfig("LightingModel")["enableAmbientLight"] = false;
    renderViewTask.getConfig("LightingModel")["enableDirectionalLight"] = false;
    renderViewTask.getConfig("LightingModel")["enablePointLight"] = false;


    Script.scriptEnding.connect(function() {
        Overlays.deleteOverlay(interstitialPageOverlay);
        Overlays.deleteOverlay(loadingSphereID);
        Overlays.deleteOverlay(anchorOverlay);
        renderViewTask.getConfig("LightingModel")["enableAmbientLight"] = true;
        renderViewTask.getConfig("LightingModel")["enableDirectionalLight"] = true;
        renderViewTask.getConfig("LightingModel")["enablePointLight"] = true;
    });
}());
