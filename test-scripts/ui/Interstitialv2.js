(function() {
    Script.include("/~/system/libraries/Xform.js");
     var userTips = [
        "Tip: Visit TheSpot to explore featured domains!",
        "Tip: Visit our docs online to learn more about scripting!",
        "Tip: Don't want others invading your personal space? Turn on the Bubble!",
        "Tip: Want to make a friend? Shake hands with them in VR!",
        "Tip: Enjoy live music? Visit Rust to dance your heart out!",
        "Tip: Have you visited BodyMart to check out the new avatars recently?",
        "Tip: Use the Create app to import models and create custom entities.",
        "Tip: We're open source! Feel free to contribute to our code on GitHub!",
        "Tip: What emotes have you used in the Emote app?",
        "Tip: Take and share your snapshots with everyone using the Snap app.",
        "Tip: Did you know you can show websites in-world by creating a web entity?",
        "Tip: Find out more information about domains by visiting our website!",
        "Tip: Did you know you can get cool new apps from the Marketplace?",
        "Tip: Print your snapshots from the Snap app to share with others!",
        "Tip: Log in to make friends, visit new domains, and save avatars!"
     ];

    function roundUp(number) {
        var precision = Math.pow(10, 1);
        return Math.ceil(number * precision) / precision;
    }

    var sphereAlpha = 1.0;
    var webOverlayAlpha = 0.89;

    function getWebOverlayOffset() {
        var desiredProps = Entities.getEntityProperties(sphereEntity, ["position", "orientation"]);
        var loadingSpherePosition = desiredProps.position;
        var loadingSphereOrientation = desiredProps.orientation;
        var overlayXform = new Xform(loadingSphereOrientation, loadingSpherePosition);
         var worldToOverlayXform = overlayXform.inv();
        var targetPosition = Vec3.sum(MyAvatar.getDefaultEyePosition(), Vec3.multiply(1.0, Quat.getFront(MyAvatar.orientation)));
        var localTargetOffset = worldToOverlayXform.xformPoint(targetPosition);
        return localTargetOffset;
    }

    var sphereEntity = Entities.addEntity({
        type: "Model",
        dimensions: { x: 5, y: 5, z: 5 },
        position: MyAvatar.position,
        modelURL: Script.resourcesPath() + "/meshes/invertedSphere.fbx",
        orientation: MyAvatar.orientation,
    }, "local");


    var webOverlay = Overlays.addOverlay("web3d", {
        parentID: sphereEntity,
        grabbale: false,
        url: Script.resolvePath("./inter.qml"),
        localPosition: getWebOverlayOffset(),
        orientation: MyAvatar.orientation,
        showKeyboardFocusHighlight: false,
        dimensions: {x: 0.59, y: 0.35},
        dpi: 28,
        maxFPS: 30,
        isSolid: true,
        alpha: 0.89
    });


    function lerp(a, b, t) {
        return ((1 - t) * a + t * b);
    }
    var materialEntity = Entities.addEntity({
        type: "Material",
        parentID: sphereEntity,
        materialURL: "materialData",
        priority: 1,
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                "model": "hifi_pbr",
                "opacity": 1.0,
                "albedoMap": "https://dantescalves.com/hifi-content/textures/interstitial.jpg",
                //"emissiveMap": "https://dantescalves.com/hifi-content/textures/interstitial.jpg"
            }
        })
    }, "local");

    var fadeIn = false;
    var currentOpacity = 1.0;
    var totalFadeTime = 0.9; // seconds
    var currentTime = 0.0;
    /*Script.update.connect(function(deltaTime) {
        currentTime += deltaTime;
        var finalOpacity = currentOpacity;
        if (fadeIn) {

            finalOpacity = lerp(0.0, 1.0, (currentTime / totalFadeTime));
            if (currentOpacity >= 1.0) {
                fadeIn = false;
                currentTime = 0.0;
            }
        } else {
            finalOpacity = lerp(1.0, 0.0, (currentTime / totalFadeTime));
            if (currentOpacity <= 0.0) {
                fadeIn = true;
                currentTime = 0.0;
            }
        }
        Entities.editEntity(materialEntity, {
            materialData: JSON.stringify({
                materialVersion: 1,
                materials: {
                    "model": "hifi_pbr",
                    "opacity": finalOpacity,
                    "albedoMap": "https://dantescalves.com/hifi-content/textures/interstitial.jpg",
                    //"emissiveMap": "https://dantescalves.com/hifi-content/textures/interstitial.jpg"
                }
            })
        });

        currentOpacity = finalOpacity;
    });*/


    var webOverlayDefaultAlpha = 0.89;
    var sphereDefuleAlpha = 1.0;

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(sphereEntity);
        Entities.deleteEntity(materialEntity);
        Overlays.deleteOverlay(webOverlay);
    });
}());
