// keyboardKeys.js
(function() {
    Script.include("/~/system/libraries/Xform.js");
   // create overlays
    var DEFAULT_KEY_MODEL = Script.resourcesPath() + "meshes/keyboard/SM_key.fbx";
    var MALLET_LENGTH = 0.2;
    var MALLET_TOUCH_Y_OFFSET = 0.052;
    var MALLET_Y_OFFSET = 0.180;

    var MALLET_ROTATION_OFFSET = {w: 0.70710678, x:0.0, y: -0.70710678, z:0.0};
    var MALLET_MODEL_DIMENSIONS = {x: 0.03, y: MALLET_LENGTH, z: 0.03};
    var MALLET_POSITION_OFFSET = {x: 0.0, y: (-MALLET_Y_OFFSET / 2.0), z: 0.0};
    var MALLET_TIP_OFFSET = {x: 0.0, y: (MALLET_LENGTH - MALLET_TOUCH_Y_OFFSET), z: 0.0};
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var HOVERING_STYLE = {
        isOutlineSmooth: true,
        outlineWidth: 3,
        outlineUnoccludedColor: {red: 13, green: 152, blue: 186},
        outlineUnoccludedAlpha: 1.0,
        outlineOccludedColor: {red: 0, green: 128, blue: 128},
        outlineOccludedAlpha: 0.0,
        fillUnoccludedColor: {red: 100, green: 192, blue: 192},
        fillUnoccludedAlpha: 0.0,
        fillOccludedColor: {red: 0, green: 255, blue: 255},
        fillOccludedAlpha: 0.0
    };

    var PRESSED_STYLE = {
        isOutlineSmooth: true,
        outlineWidth: 0,
        outlineUnoccludedColor: {red: 0, green: 128, blue: 128},
        outlineUnoccludedAlpha: 0.0,
        outlineOccludedColor: {red: 0, green: 128, blue: 128},
        outlineOccludedAlpha:0.0,
        fillUnoccludedColor: {red: 50, green: 50, blue: 50},
        fillUnoccludedAlpha: 0.6,
        fillOccludedColor: {red: 0, green: 255, blue: 255},
        fillOccludedAlpha: 0.0
    };


    Selection.enableListHighlight("keyPressed", PRESSED_STYLE);
    Selection.enableListToScene("keyPressed");
    Selection.enableListHighlight("keyHover", HOVERING_STYLE);
    Selection.enableListToScene("keyHover");
    var entityKey = null;
    var anchor = null;
    var firstKey = null;
    var secondKey = null;
    function calculateKeyboardPosition() {
        var tabletPosition = Overlays.getProperty(HMD.tabletID, "position");
        var tabletOrientation = Overlays.getProperty(HMD.tabletID, "orientation");
        var sensorToWorldScale = MyAvatar.sensorToWorldScale;

        var tabletXform = new Xform(MyAvatar.orientation, MyAvatar.position);

        var offset = {x: -0.6, y: 0.3, z: -0.7};
        var scaledOffset = Vec3.multiply(sensorToWorldScale, offset);

        return tabletXform.xformPoint(scaledOffset);
    }

    function calculateKeyboardOrientation() {
        var offsetOrientation = Quat.fromVec3Degrees({x: 0, y: 180, z: 0});
        return Quat.multiply(MyAvatar.orientation, offsetOrientation);
    }

    var leftStylusPointer = Pointers.createPointer(PickType.Stylus, {
        hand: 0,
        filter: Picks.PICK_OVERLAYS,
        hover: true,
        enabled: true
    });
    var rightStylusPointer = Pointers.createPointer(PickType.Stylus, {
        hand: 1,
        filter: Picks.PICK_OVERLAYS,
        hover: true,
        enabled: true,
        model: {
            url: Script.resourcesPath() + "meshes/drumstick.fbx",
            positionOffset: MALLET_POSITION_OFFSET,
            rotationOffset: MALLET_ROTATION_OFFSET,
            dimensions: MALLET_MODEL_DIMENSIONS
        },
        tipOffset: MALLET_TIP_OFFSET
    });

    anchor = Overlays.addOverlay("cube", {
        "solid": true,
        "grabbable": true,
        "dimensions": {
            "x": 0.023600000888109207,
            "y": 0.022600000724196434,
            "z": 0.1274999976158142
        },
        "ignoreRayIntersection": false,
    });
    var localPos = {x: 0.05, y: 0.0, z: 0.0};

    var imageOverlay = Overlays.addOverlay("image3d", {
        "url": Script.resourcesPath() + "meshes/keyboard/text_placard.png",
        "localPosition": {
            "x": -0.2332040786743164,
            "y": 0.059300000742077827,
            "z": 0.057454843521118164
        },
        "dimensions": {
            "x": 0.15,
            "y": 0.15,
            "z": 0.1
        },
        "alpha": 0.8,
        "parentID": anchor,
        "visible": false,
        "emissive": true
    });

    var text = "";
    var textOverlay = Overlays.addOverlay("text3d", {
        visible: true,
        parentID: anchor,
        text: text,
        lineHeight: 0.05,
        isDashedLine: false,
        "dimensions": {
            "x": 0.15,
            "y": 0.045,
            "z": 0.1
        },
        localPosition: {
            "x": -0.2332040786743164,
            "y": 0.059300000742077827,
            "z": 0.057454843521118164
        },
        leftMargin: 0,
        rightMargin: 0,
        topMargin: 0,
        bottomMargin: 0
    });
    secondKey = Overlays.addOverlay("model", {
        "solid": true,
        "parentID": anchor,
        "visible": true,
        "url": DEFAULT_KEY_MODEL,
        "alpha": 0.7,
        "localPosition": {
            "x": -0.5332040786743164,
            "y": 0.019300000742077827,
            "z": 0.027454843521118164
        },
        "dimensions": {
             "x": 0.04787999764084816,
             "z": 0.02051999792456627,
             "y": 0.04787999764084816
         },
        "localOrientation": {
            "w": 0.000,
            "x": 0.000,
            "y": 0.707,
            "z": 0.707
        },
        "textures": {
            "file9": Script.resourcesPath() + "meshes/keyboard/key_p.png",
            "file10": Script.resourcesPath() + "meshes/keyboard/key_p.png"
        },
        "ignoreRayIntersection": false
    });

    var debugOverlay = Overlays.addOverlay("sphere", {
        solid: true,
        color: {red: 255, blue: 0, green: 0},
        parentID: secondKey,
        dimensions: {x: 0.003, y: 0.003, z: 0.003},
        ignoreRayIntersection: false,
        visible: true,
        drawInFront: true,
        alpha: 1.0
    });

    var pressedKeys = {
        secondKey: false
    };

    function toggleKeyboard() {
        var props;
        if (HMD.showTablet) {
            props = {
                "visible": true,
                "position": calculateKeyboardPosition(),
                "orientation": calculateKeyboardOrientation()
            };
            Overlays.editOverlay(anchor, props);
            Overlays.editOverlay(secondKey, {"visible": true});
        } else {
            props = {"visible": false};

            Overlays.editOverlay(anchor, props);
            Overlays.editOverlay(secondKey, props);
        }
    }

    tablet.tabletShownChanged.connect(toggleKeyboard);


    Pointers.setRenderState(rightStylusPointer, "events on");
    Pointers.setRenderState(leftStylusPointer, "events on");
    Pointers.setIncludeItems(rightStylusPointer, [secondKey]);
    Pointers.setIncludeItems(leftStylusPointer, [secondKey]);
    Pointers.enablePointer(rightStylusPointer);
    Pointers.enablePointer(leftStylusPointer);
    firstKey = Overlays.addOverlay("model", {});
    var lastLocalPosition = null;

    function cleanup() {
        Entities.deleteEntity(entityKey);
        Overlays.deleteOverlay(anchor);
        Overlays.deleteOverlay(firstKey);
        Overlays.deleteOverlay(secondKey);
        Overlays.deleteOverlay(debugOverlay);
        Overlays.deleteOverlay(imageOverlay);
        Overlays.deleteOverlay(textOverlay);
        Pointers.removePointer(leftStylusPointer);
        Pointers.removePointer(rightStylusPointer);
    }

    function mousePressOnOverlay(overlayID, event) {
        if (overlayID === secondKey && event.button === "Primary") {
            var overlayPosition = Overlays.getProperty(anchor, "position");
            var overlayOrientation = Overlays.getProperty(anchor, "orientation");
            var worldPosition = event.pos3D;

            var overlayXform = new Xform(overlayOrientation, overlayPosition);
            var overlayInv = overlayXform.inv();
            var direction = Vec3.subtract(event.pos3D, overlayPosition);

            lastLocalPosition = overlayInv.xformPoint(worldPosition);


            if (event.id === leftStylusPointer) {
                Controller.triggerHapticPulse(0.6, 3, 0);
            } else if (event.id === rightStylusPointer) {
                Controller.triggerHapticPulse(0.6, 3, 1);
            }

            text += "*";

            var textHeight = Overlays.textSize(textOverlay, text);
            var dimensions = {
                x: 0.15,
                y: 0.045,
                z: 0.1
            };


            var sensorToWorldScale = MyAvatar.sensorToWorldScale;
            var leftMargin = dimensions.x / 2;
            dimensions.x += textHeight.width;
            dimensions = Vec3.multiply(dimensions, sensorToWorldScale);
            Overlays.editOverlay(textOverlay, {
                text: text,
                leftMargin: leftMargin,
                dimensions: dimensions
            });

            Overlays.editOverlay(secondKey, {
                color: {red: 0, blue: 192, green: 192}
            });

            Selection.addToSelectedItemsList("keyPressed", "overlay", secondKey)
        }
    }

    var pressed = false;
    function mouseMoveOnOverlay(overlayID, event) {
        if (overlayID === secondKey && event.button === "Primary") {
            if (true) {
                pressedKeys[overlayID] = true;
                var worldPosition = event.pos3D;
                var pickResult = Pointers.getPrevPickResult(event.id);


                var overlayPosition = Overlays.getProperty(overlayID, "position");
                var direction = Vec3.subtract(event.pos3D, overlayPosition);
                Overlays.editOverlay(debugOverlay, {"position": pickResult.stylusTip.position});
                var overlayOrientation = Overlays.getProperty(overlayID, "orientation");
                var overlayXform = new Xform(overlayOrientation, overlayPosition);
                var overlayXformInv = overlayXform.inv();

                var stylusTipOverlay = overlayXformInv.xformPoint(pickResult.stylusTip.position);

                var offset = stylusTipOverlay.z - 0.009;
                Overlays.editOverlay(secondKey, {localPosition: Vec3.sum(localPos, {x: 0, y: 0, z: offset / 4})});
            }
        }
    }

    function mouseReleaseOnOverlay(overlayID, event) {
        if (overlayID === secondKey && event.button === "Primary") {
            pressedKeys[overlayID] = false;
            pressed = false;
            Overlays.editOverlay(secondKey, {"localPosition": localPos});
            Overlays.editOverlay(secondKey, {
                color: {red: 255, blue: 255, green: 255}
            });

            Selection.removeFromSelectedItemsList("keyPressed", "overlay", secondKey);
        }
    }

    function hoverEnter(overlayID, event) {
        Selection.addToSelectedItemsList("keyHover", "overlay", secondKey);
    }

    function hoverLeave(overlayID, event) {
        Selection.removeFromSelectedItemsList("keyHover", "overlay", secondKey);
    }

    Overlays.mousePressOnOverlay.connect(mousePressOnOverlay);
    Overlays.mouseReleaseOnOverlay.connect(mouseReleaseOnOverlay);
    Overlays.mouseMoveOnOverlay.connect(mouseMoveOnOverlay);
    Overlays.hoverEnterOverlay.connect(hoverEnter);
    Overlays.hoverLeaveOverlay.connect(hoverLeave);
    Script.scriptEnding.connect(cleanup);
}());
