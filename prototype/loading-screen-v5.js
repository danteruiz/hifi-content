/* global Script, Controller, Overlays, Quat, MyAvatar, Entities, print, Vec3, AddressManager, Render, Window, Toolbars,
   Camera, HMD*/
var MAX_X_SIZE = 3;
var isVisible = false;
var defaultOffset = 1.5;
var hifi = "HighFidelity";
var VOLUME = 0.4;
var tune = SoundCache.getSound("http://hifi-content.s3.amazonaws.com/dante/song/crystals_and_voices_2.wav");
var sample = null;
var MAX_LEFT_MARGIN = 1.9;
var INNER_CIRCLE_WIDTH = 4.7;
var DESTINATION_CARD_Y_OFFSET = 2;
var DEFAULT_TONE_MAPPING_EXPOSURE = 0.0;
var MIN_TONE_MAPPING_EXPOSURE = -5.0;
var SYSTEM_TOOL_BAR = "com.highfidelity.interface.toolbar.system";
var MAX_ELAPSED_TIME = 15 * 1000; // time in ms
function isInFirstPerson() {
    return (Camera.mode === "first person");
}

var toolbar = Toolbars.getToolbar(SYSTEM_TOOL_BAR);
var renderViewTask = Render.getConfig("RenderMainView");

var userTips = [
    "Visit TheSpot to explore featured domains",
    "Visit out docs online to learn more about scripting",
    "Don't want others invading your personal space? Turn on the Bubble!",
    "Want to make a friend? Shake hands with them in VR?",
    "Enjoy live music? Visit Rust to dance your heart out!",
    "Have you visited BodyMart to check out the new avatars recently?",
    "Use the Create app to import models and create custom entities",
    "We're open source! Feel free to contribute to our  code on GitHub!",
    "What emotes have you used in the emote app?",
    "Take and share your snapshots with everyone using the Snap app",
    "Did you know you can show websites in-world by creating a web entity?",
    "Find out more inforamtion about domains by visiting our website!",
    "Did you know you can get cool new apps from the Marketplace?",
    "Print your snapshots from the Snap app t share with others!",
    "Log in to make friends, visit new domains, and save avatars!"
];

var loadingSphereID = Overlays.addOverlay("model", {
    name: "Loading-Sphere",
    position: Vec3.sum(Vec3.sum(MyAvatar.position, {x: 0.0, y: -1.0, z: 0.0}), Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.95, z: 0})),
    orientation: Quat.multiply(Quat.fromVec3Degrees({x: 0, y: 180, z: 0}), MyAvatar.orientation),
    url: "http://hifi-content.s3.amazonaws.com/dante/entities/black-sphere-v4.fbx",
    dimensions: { x: 12.408, y: 15.731, z: 12.408 },
    alpha: 1,
    visible: isVisible,
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
    visible: isVisible,
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
    visible: isVisible,
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
    visible: isVisible,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
    parentID: loadingSphereID
});

var hostName = "";

var domainHostname = Overlays.addOverlay("text3d", {
    name: "Loading-Hostname",
    localPosition: { x: 0.0, y: DESTINATION_CARD_Y_OFFSET - 0.4, z: 5.45 },
    text: hostName,
    textAlpha: 1,
    backgroundAlpha: 0,
    lineHeight: 0.125,
    visible: isVisible,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
    parentID: loadingSphereID
});

var loadingToTheSpotID = Overlays.addOverlay("model", {
    name: "Loading-Destination-Card-Text",
    localPosition: { x: 0.0 , y: DESTINATION_CARD_Y_OFFSET - 0.85, z: 5.45 },
    url: "https://hifi-content.s3.amazonaws.com/dante/entities/go-to-button.fbx",
    dimensions: { x: 1.8, y: 0.3, z: 0.2 },
    alpha: 1,
    visible: isVisible,
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


function getLeftMargin(overlayID, text) {
    var textSize = Overlays.textSize(overlayID, text);
    var sizeDifference = ((INNER_CIRCLE_WIDTH - textSize.width) / 2);
    var leftMargin = -(MAX_LEFT_MARGIN - sizeDifference);
    return leftMargin;
}


function domainChanged(domain) {
    var name = AddressManager.placename;
    domainName = name.charAt(0).toUpperCase() + name.slice(1);
    var domainNameLeftMargin = getLeftMargin(domainNameTextID, domainName);
    var textProperties = {
        text: domainName,
        leftMargin: domainNameLeftMargin
    };

    var randomIndex = Math.floor(Math.random() * userTips.length);
    var host = userTips[randomIndex];
    var hostLeftMargin = getLeftMargin(domainHostname, host);
    var hostnameProperties = {
        text: host,
        leftMargin: hostLeftMargin
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
    Overlays.editOverlay(domainHostname, hostnameProperties);
}

var THE_PLACE = "hifi://TheSpot";
function clickedOnOverlay(overlayID, event) {
    print(overlayID + " other: " + loadingToTheSpotID);
    print(event.button === "Primary");
    if (loadingToTheSpotID === overlayID) {
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
    Overlays.editOverlay(domainHostname, properties);
}

function update() {
    var physicsEnabled = Window.isPhysicsEnabled();
    var thisInterval = Date.now();
    var deltaTime = (thisInterval - lastInterval);
    lastInterval = thisInterval;
    if (physicsEnabled !== previousPhysicsStatus) {
        if (!physicsEnabled && !timerset) {
            updateOverlays(physicsEnabled);
            sample = Audio.playSound(tune, {
                localOnly: true,
                position: MyAvatar.headPosition,
                volume: VOLUME
            });
            timeElapsed = 0;
            timerset = true;
        }
        previousPhysicsStatus = physicsEnabled;
    }

    if (timerset) {
        timeElapsed += deltaTime;
        if (timeElapsed >= MAX_ELAPSED_TIME) {
            updateOverlays(true);
            sample.stop();
            sample = null;
            timerset = false;
        }

    }

    Overlays.editOverlay(loadingSphereID, {
        position: Vec3.sum(Vec3.sum(MyAvatar.position, {x: 0.0, y: -1.7, z: 0.0}), Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.95, z: 0}))
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
    Overlays.deleteOverlay(domainHostname);
    try {
    }  catch (e) {
    }
}

Script.scriptEnding.connect(cleanup);
