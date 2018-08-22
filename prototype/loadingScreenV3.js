
/* global Script, Controller, Overlays, Quat, MyAvatar, Entities, print, Vec3, AddressManager, Render, Window, Toolbars,
   Camera, HMD*/
var MAX_X_SIZE = 3;
var defaultOffset = 1.5;
var hifi = "HighFidelity";
var VOLUME = 0.4;
var tune = SoundCache.getSound("http://hifi-content.s3.amazonaws.com/dante/song/crystals_and_voices_2.wav ");
var STABILITY = 3.0;
var entitiesCount = 0;
var entitiesReadyCount = 0;
var entitiesStabilityCount = 0;
var domainHostnameMap = {
    eschatology: "Seth Alves",
    blue: "Sam Cake",
    thepines: "Roxie",
    "dev-mobile": "HighFidelity",
    "dev-mobile-master": "HighFidelity",
    portalarium: "Bijou",
    porange: "Caitlyn",
    rust: hifi,
    start: hifi,
    miimusic: "Madysyn",
    codex: "FluffyJenkins",
    zaru: hifi,
    help: hifi,
    therealoasis: "Caitlyn",
    vrmacy: "budgiebeats",
    niccage: "OneLisa",
    impromedia: "GeorgeDeac",
    nest: "budgiebeats",
    gabworld: "LeeGab",
    vrtv: "GeoorgeDeac",
    burrow: "budgiebeats",
    leftcoast: "Lurks",
    lazybones: "LazybonesJurassic",
    skyriver: "Chamberlain",
    chapel: "www.livin.today",
    "hi-studio": hifi,
    luskan: "jyoum",
    arcadiabay: "Aitolda",
    chime: hifi,
    standupnow: "diva",
    avreng: "GeorgeDeac",
    atlas: "rocklin_guy",
    steamedhams: "Alan_",
    banff: hifi,
    operahouse: hifi,
    bankofhighfidelity: hifi,
    tutorial: "WadeWatts",
    nightsky: hifi,
    garageband: hifi,
    painting: hifi,
    windwaker: "bijou",
    fumbleland: "Lpasca",
    monolith: "Nik",
    bijou: "bijou",
    morty: "bijou",
    "hifiqa-rc-bots": hifi,
    fightnight: hifi,
    spirited: "Alan_",
    "desert-oasis": "ryan",
    springfield: "Alan_",
    hall: "ryan",
    "national-park": "ryan",
    vector: "Nik",
    bodymart: hifi,
    "medievil-village": "ryan",
    "villains-lair": "ryan",
    "island-breeze": "ryan",
    "classy-apartment": "ryan",
    voxel: "FlameSoulis",
    virtuoso: "noahglaseruc",
    avatarisland: hifi,
    ioab: "rocklin_guy",
    tamait: "rocklin_guy",
    konshulabs: "Konshu",
    epic: "philip",
    poopsburg: "Caitlyn",
    east: hifi,
    glitched: hifi,
    calartsim: hifi,
    calarts: hifi,
    livin: "rocklin_guy",
    fightclub: "philip",
    thefactory: "whyroc",
    wothal: "Alezia.Kurdis",
    udacity: hifi,
    json: "WadeWatts",
    anonymous: "darlingnotin",
    maker: hifi,
    elisa: "elisahifi",
    volxeltopia: hifi,
    cupcake: hifi,
    minigolf: hifi,
    workshop: hifi,
    vankh: "Alezia.Kurdis",
    "the-crash-site": "WolfGang",
    jjv360: "jjv3600",
    distributed2: hifi,
    anny: hifi,
    university: hifi,
    ludus: hifi,
    stepford: "darlingnotin",
    thespot: hifi
};
var DESTINATION_CARD_Y_OFFSET = -0.1;
var DEFAULT_TONE_MAPPING_EXPOSURE = 0.0;
var MIN_TONE_MAPPING_EXPOSURE = -5.0;
var SYSTEM_TOOL_BAR = "com.highfidelity.interface.toolbar.system";
var MAX_ELAPSED_TIME = 16 * 1000; // time in ms
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
    url: "http://hifi-content.s3.amazonaws.com/dante/entities/ring-w-glow.fbx",
    alpha: 1,
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
var domainHostname = Overlays.addOverlay("text3d", {
    name: "Loading-Hostname",
    localPosition: { x: 0.0, y: DESTINATION_CARD_Y_OFFSET - 0.4, z: 5.45 },
    leftMargin: 0.20,
    text: hostName,
    textAlpha: 1,
    backgroundAlpha: 0,
    lineHeight: 0.125,
    visible: false,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0, y: 180, z: 0 }),
    parentID: loadingSphereID
});

var progressBar = Overlays.addOverlay("cube", {
    name: "Loading-ProgressBar",
    localPosition: { x: 0.0 , y: DESTINATION_CARD_Y_OFFSET - 0.45, z: 5.6 },
    dimensions: {
        x: 0.7,
        y: 0.08134997636079788,
        z: 0.08134997636079788
    },
    scale: 0.11,
    alpha: 1,
    color: {red: 31, green: 198, blue: 166},
    isSolid: true,
    visible: false,
    emissive: true,
    ignoreRayIntersection: true,
    drawInFront: true,
    grabbable: false,
    localOrientation: Quat.fromVec3Degrees({ x: 0.0, y: -180.0, z: 0.0 }),
    parentID: loadingSphereID
});

var loadingToTheSpotID = Overlays.addOverlay("model", {
    name: "Loading-Destination-Card-Text",
    localPosition: { x: 0.0 , y: DESTINATION_CARD_Y_OFFSET - 0.85, z: 5.45 },
    url: "https://hifi-content.s3.amazonaws.com/dante/entities/go-to-button.fbx",
    dimensions: { x: 1.8, y: 0.3, z: 0.2 },
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

    var BY = "by ";
    var host = domainHostnameMap[location.placename];

    var hostnameProperties = {
        text: BY + host
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
    currentPrgrogress = 0;
    target = 0;
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

function lerp(a, b, t) {
    return ((1 - t) * a + t * b);
}
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
    Overlays.editOverlay(progressBar, {
        visible: !physicsEnabled,
        localPosition: { x: -(0 / 2) + defaultOffset, y: DESTINATION_CARD_Y_OFFSET - 0.45, z: 5.6 },
        dimensions: {
            x: 0.0,
            y: 0.08134997636079788,
            z: 0.08134997636079788
        }
    });
}

var currentPrgrogress = 0;
var target = 0;
var loadingComplete = false;
function update() {
    var physicsEnabled = Window.isPhysicsEnabled();
    var thisInterval = Date.now();
    var deltaTime = (thisInterval - lastInterval);
    lastInterval = thisInterval;
    if (physicsEnabled !== previousPhysicsStatus) {
        if (!physicsEnabled) {
            updateOverlays(physicsEnabled);
            Audio.playSound(tune, {
                localOnly: true,
                position: MyAvatar.headPosition,
                volume: VOLUME
            });
            timeElapsed = 0;
            loadingComplete = false; 
            currentPrgrogress = 0;
            target = 0;
            previousPhysicsStatus = physicsEnabled;
        } else if (physicsEnabled && loadingComplete) {
            updateOverlays(physicsEnabled);
            previousPhysicsStatus = physicsEnabled;
        }
    }
    if (!loadingComplete) {
        var nearbyEntitiesReadyCount = Window.getPhysicsNearbyEntitiesReadyCount();
        var stabilityCount = Window.getPhysicsNearbyEntitiesStabilityCount();
        var nearbyEntitiesCount = Window.getPhysicsNearbyEntitiesCount();

        var stabilityPercentage = (stabilityCount / STABILITY);
        if (stabilityPercentage > 1) {
            stabilityPercentage = 1;
        }

        var stabilityProgress = (MAX_X_SIZE * 0.75) * stabilityPercentage;
        var entitiesLoadedPercentage = nearbyEntitiesReadyCount / nearbyEntitiesCount;
        var entitiesLoadedProgress = (MAX_X_SIZE * 0.25) * entitiesLoadedPercentage;
        var progress = stabilityProgress + entitiesLoadedProgress;

        if (progress >= target) {
            target = progress;
        }

        currentPrgrogress = lerp(currentPrgrogress, target, 0.2);
        var properties = {
            localPosition: { x: -(currentPrgrogress / 2) + defaultOffset, y: DESTINATION_CARD_Y_OFFSET - 0.45, z: 5.6 },
            dimensions: {
                x: currentPrgrogress,
                y: 0.08134997636079788,
                z: 0.08134997636079788
            },
            color: {red: 31, green: 198, blue: 166}
        };

        Overlays.editOverlay(progressBar, properties);
        if (currentPrgrogress >= 2.9) {
            loadingComplete = true;
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
    Overlays.deleteOverlay(progressBar);
    Overlays.deleteOverlay(loadTextID);
    Overlays.deleteOverlay(domainHostname);
    try {
    }  catch (e) {
    }
}

Script.scriptEnding.connect(cleanup);






var userTips = [
    "Visit TheSpot to explore featured Domains",
    "Visit out docs online to learn more about scripting",
    "Don't want others invading your personal space? Turn on the Bubble to keep them at a distance",
    "Want to make a friend? Shake hands with them in VR?",
    "Looking for a party? Visit Rust, where live DJs play to dance your heart out!",
    "Have you visited BodyMart to check out the new avatars recently?",
    "Did you know you can create your own entities? Use the create menu to import custom content!",
    "We're open source! Feel free to contribute to our open source code on GitHub!",
    "What emotes have you used in the emote app?",
    "Take and share your snapshots with everyone using the Snap app",
    "Did you know you can show websites in-world by creating a web entity?",
    "Did you know that you can check information about domains via our website?",
    "Add cool new apps to your tablet by visiting the 'Apps' category in the Marketplace",
    "You can print your snaps from the snaps app to share your best work with those around you",
    "Log in to make friends, visit new domains, and save avatars and items"
];
