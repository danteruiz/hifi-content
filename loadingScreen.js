"use strict";

/* global Script, Controller, Overlays, Quat, MyAvatar, Entities, print, Vec3, AddressManager, Render, Window, Toolbars,
   Camera, HMD*/

(function() {
    var request = Script.require('request').request;

    // constants
    var SYSTEM_TOOL_BAR = "com.highfidelity.interface.toolbar.system";
    var DESTINATION_CARD_Y_OFFSET = 2;
    var MAX_LOADING_BAR_LENGTH = 3.0;
    var MAX_LEFT_MARGIN = 1.9;
    var INNER_CIRCLE_WIDTH = 4.7;

    var toolbar = Toolbars.getToolbar(SYSTEM_TOOL_BAR);
    var renderViewTask = Render.getConfig("RenderMainView");

    var loadingSphereID = Overlays.addOverlay("model", {
        name: "Loading-Sphere",
        position:  Vec3.sum(Vec3.sum(MyAvatar.position, {x: 0.0, y: -1.0, z: 0.0}), Vec3.multiplyQbyV(MyAvatar.orientation, {x: 0, y: 0.95, z: 0})),
        orientation: Quat.multiply(Quat.fromVec3Degrees({x: 0, y: 180, z: 0}), MyAvatar.orientation),
        url: "http://hifi-content.s3.amazonaws.com/alan/dev/black-sphere.fbx",
        dimensions: { x: 12.408, y: 15.731, z: 12.408 },
        alpha: 1,
        visible: false,
        ignoreRayIntersection: true,
        drawInFront: true,
        grabbable: false
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


    function getLeftMargin(overlayID, text) {
        var textSize = Overlays.textSize(overlayID, text);
        var sizeDifference = ((INNER_CIRCLE_WIDTH - textSize.width) / 2);
        var leftMargin = -(MAX_LEFT_MARGIN - sizeDifference);
        return leftMargin;
    }

    function domainChanged(domain) {
        print("-------> " + domain);

        var name = AddressManager.placename;
        domainName = name.charAt(0).toUpperCase() + name.slice(1);
        var domainLeftMargin = getLeftMargin(domainNameTextID, domainName);
        var textProperties = {
            text: domainName,
            leftMargin: domainLeftMargin
        };

        var BY = "by ";
        var host = "";
        var text = BY + host;
        var hostLeftMargin = getLeftMargin(domainHostname, text);
        var hostnameProperties = {
            text: BY + host,
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

    var TARGET_UPDATE_HZ = 60;
    var BASIC_TIMER_INTERVAL_MS = 1000 / TARGET_UPDATE_HZ;
    var lastInterval = Date.now();
    function update() {
        var physicsEnabled = Window.isPhysicsEnabled();
        var thisInterval = Date.now();
        var deltaTime = (thisInterval - lastInterval);
    }



    function cleanup() {
    }
})();
