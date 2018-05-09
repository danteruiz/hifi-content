
/* global Script, Controller, Overlays, Quat, MyAvatar, Entities, print, Vec3, AddressManager, Render, Window, Toolbars,
   Camera, HMD*/


var DESTINATION_CARD_Y_OFFSET = -0.1;
var DEFAULT_TONE_MAPPING_EXPOSURE = 0.0;
var MIN_TONE_MAPPING_EXPOSURE = -5.0;
var SYSTEM_TOOL_BAR = "com.highfidelity.interface.toolbar.system";
var MAX_ELAPSED_TIME = 30 * 1000; // time in ms
function isInFirstPerson() {
    return (Camera.mode === "first person");
}

var toolbar = Toolbars.getToolbar(SYSTEM_TOOL_BAR);
var renderViewTask = Render.getConfig("RenderMainView");
var loadingSphereID = Overlays.addOverlay("model", {
    name: "Loading-Sphere",
    position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.95, z: 0})),
    orientation: Quat.multiply(Quat.fromVec3Degrees({x: 0, y: 180, z: 0}), MyAvatar.orientation),
    url: "http://hifi-content.s3.amazonaws.com/alan/dev/black-sphere.fbx",
    dimensions: { x: 12.408, y: 15.731, z: 12.408 },
    alpha: 1,
    visible: false,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false
});

var spinnerID = Overlays.addOverlay("model", {
    name: "Loading-spinner",
    localPosition: { x: 0, y: DESTINATION_CARD_Y_OFFSET, z: 5.5 },
    dimensions:  { x: 5.7, y: 0.01, z: 5.7 },
    url: "http://hifi-content.s3.amazonaws.com/alan/dev/ring-animated-w-glow.fbx",
    alpha: 1,
    animationSettings: {
        fps: 30,
        loop: true,
        running: true,
        url: "http://hifi-content.s3.amazonaws.com/alan/dev/ring-animated-w-glow.fbx"
    },
    visible: false,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: -90, y: 0, z: 180 }),
    parentID: loadingSphereID
});

var mainLoadingText = "L O A D I N G . . .";
var loadTextID = Overlays.addOverlay("text3d", {
    name: "Loading-Destination-Card-Text",
    localPosition: { x: 0.0, y: DESTINATION_CARD_Y_OFFSET + 0.2, z: 5.45 },
    text: mainLoadingText,
    dimensions: { x: 1.0, y: 2.0, z: 0.01 },
    textAlpha: 1,
    backgroundAlpha: 0,
    lineHeight: 0.13 ,
    visible: false,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
    parentID: loadingSphereID
});

var domainName = "";
var domainNameTextID = Overlays.addOverlay("text3d", {
    name: "Loading-Destination-Card-Text",
    localPosition: { x: 0.0, y: DESTINATION_CARD_Y_OFFSET + 0.1, z: 5.45 },
    text: domainName,
    textAlpha: 1,
    backgroundAlpha: 0,
    lineHeight: 0.45,
    visible: false,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
    parentID: loadingSphereID
});

var hostName = "";

var domainHostname = Overlays.addOverlays("text3d", {
    name: "Loading-Hostname",
    localPosition: { x: 0.0, y: DESTINATION_CARD_Y_OFFSET + 0.1, z: 5.45 },
    text: domainName,
    textAlpha: 1,
    backgroundAlpha: 0,
    lineHeight: 0.45,
    visible: false,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
    parentID: loadingSphereID
});

var loadingToTheSpotID = Overlays.addOverlay("image3d", {
    name: "Loading-Destination-Card-Text",
    localPosition: { x: 0.0 , y: DESTINATION_CARD_Y_OFFSET - 0.7, z: 5.35 },
    url: "https://hifi-content.s3.amazonaws.com/dante/entities/Loading-button-mockup.png",
    dimensions: { x: 1.7, y: 1.7, z: 0.001 },
    alpha: 1,
    visible: false,
    emissive: true,
    ignoreRayIntersection: false,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0.0, y: 180.0, z: 0.0 }),
    parentID: loadingSphereID
});

var TARGET_UPDATE_HZ = 60; // 50hz good enough, but we're using update
var BASIC_TIMER_INTERVAL_MS = 1000 / TARGET_UPDATE_HZ;
var timerset = false;
var lastInterval = Date.now();
var timeElapsed = 0;

function domainChanged(domain) {
    var name = AddressManager.placename;
    domainName = name.charAt(0).toUpperCase() + name.slice(1);
    var domainNameLength = domainName.length;
    var localPosition = { x: 0.0, y: DESTINATION_CARD_Y_OFFSET + 0.1, z: 5.45 };
    var margin = 0.0;
    if (domainNameLength > 4) {
        var divider = (domainNameLength >= 15) ? 2 : 3;
        localPosition.x = (0.1486 * (domainNameLength / divider));
    }
    var textProperties = {
        text: domainName,
        localPosition: localPosition,
        leftMargin: margin
    };

    var myAvatarDirection = Vec3.UNIT_NEG_Z;
    var cardDirectionPrime = {x: 0 , y: 0, z: 5.5};
    var rotationDelta = Quat.rotationBetween(cardDirectionPrime, myAvatarDirection);
    var overlayRotation = Quat.multiply(MyAvatar.orientation, rotationDelta);
    var mainSphereProperties = {
        orientation: overlayRotation
    };

    Overlays.editOverlay(loadingSphereID, mainSphereProperties);
    Overlays.editOverlay(domainNameTextID, textProperties);
}

var THE_PLACE = "hifi://TheSpot";
function clickedOnOverlay(overlayID, event) {
    if (loadingToTheSpotID === overlayID && event.button === "Primary") {
        if (timerset) {
            timeElapsed = 0;
        }
        AddressManager.handleLookupString(THE_PLACE);
    }
}
var previousCameraMode = Camera.mode;
var previousPhysicsStatus = 99999;

function updateOverlays(physicsEnabled) {
    var properties = {
        visible: !physicsEnabled
    };

    var myAvatarDirection = Vec3.UNIT_NEG_Z;
    var cardDirectionPrime = {x: 0 , y: 0, z: 5.5};
    var rotationDelta = Quat.rotationBetween(cardDirectionPrime, myAvatarDirection);
    var overlayRotation = Quat.multiply(MyAvatar.orientation, rotationDelta);
    var mainSphereProperties = {
        visible: !physicsEnabled,
        orientation: overlayRotation
    };

    if (!HMD.active) {
        toolbar.writeProperty("visible", physicsEnabled);
        MyAvatar.headOrientation = Quat.multiply(Quat.cancelOutRollAndPitch(MyAvatar.headOrientation), Quat.fromPitchYawRollDegrees(2.5, 0, 0));
    }

    renderViewTask.getConfig("LightingModel")["enableAmbientLight"] = physicsEnabled;
    renderViewTask.getConfig("LightingModel")["enableDirectionalLight"] = physicsEnabled;
    renderViewTask.getConfig("LightingModel")["enablePointLight"] = physicsEnabled;
    Overlays.editOverlay(loadingSphereID, mainSphereProperties);
    Overlays.editOverlay(loadingToTheSpotID, properties);
    Overlays.editOverlay(spinnerID, properties);
    Overlays.editOverlay(domainNameTextID, properties);
    Overlays.editOverlay(loadTextID, properties);
}

function update() {
    var physicsEnabled = Window.isPhysicsEnabled();
    var thisInterval = Date.now();
    var deltaTime = (thisInterval - lastInterval);
    lastInterval = thisInterval;
    if (physicsEnabled !== previousPhysicsStatus) {
        if (!physicsEnabled && !timerset) {
            updateOverlays(physicsEnabled);
            timeElapsed = 0;
            timerset = true;
        }
        previousPhysicsStatus = physicsEnabled;
    }

    if (timerset) {
        timeElapsed += deltaTime;
        print(timeElapsed);
        if (timeElapsed >= MAX_ELAPSED_TIME) {
            updateOverlays(physicsEnabled);
            timerset = false;
        }
    }
    Overlays.editOverlay(loadingSphereID, {
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.95, z: 0}))
    });
    Script.setTimeout(update, BASIC_TIMER_INTERVAL_MS);
}

Script.setTimeout(update, BASIC_TIMER_INTERVAL_MS);
Overlays.mouseReleaseOnOverlay.connect(clickedOnOverlay);
Window.domainChanged.connect(domainChanged);

function cleanup() {
    Overlays.deleteOverlay(loadingSphereID);
    Overlays.deleteOverlay(spinnerID);
    Overlays.deleteOverlay(loadingToTheSpotID);
    Overlays.deleteOverlay(domainNameTextID);
    Overlays.deleteOverlay(loadTextID);
    try {
    }  catch (e) {
    }
}

Script.scriptEnding.connect(cleanup);
