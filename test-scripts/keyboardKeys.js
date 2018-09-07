// keyboardKeys.js
(function() {
    Script.include("/~/system/libraries/Xform.js");
   // create overlays
    var DEFAULT_KEY_MODEL = "https://hifi-content.s3.amazonaws.com/DomainContent/production/default-image-model.fbx";
    var entityKey = null;
    var anchor = null;
    var firstKey = null;
    var secondKey = null;
    function calculateKeyboardPosition() {
        var headPosition = MyAvatar.getHeadPosition();
        var position = Vec3.sum(headPosition, Vec3.multiply(0.5, Quat.getFront(MyAvatar.orientation)));
        return position;
    }

/*
    var entityKey = Entities.addEntity({
        "clientOnly": false,
        "created": "2018-07-30T19:59:16Z",
        "dimensions": {
            "blue": 0.04787999764084816,
            "green": 0.02051999792456627,
            "red": 0.04787999764084816,
            "x": 0.04787999764084816,
            "y": 0.02051999792456627,
            "z": 0.04787999764084816
        },
        "id": "{6ad44e28-8a2f-480d-89c5-8cba8d9d1260}",
        "lastEdited": 1535595473327551,
        "lastEditedBy": "{c8997cba-4fb5-46b3-9d5d-f589c92f0bf2}",
        "name": "Piano Key 9",
        "position": calculateKeyboardPosition(),
        "queryAACube": {
            "scale": 0.07075350731611252,
            "x": -8.58856201171875,
            "y": 9.050573348999023,
            "z": 5.398171424865723
        },
        "rotation": {
            "w": 7.62939453125e-05,
            "x": 4.57763671875e-05,
            "y": -1,
            "z": 7.62939453125e-05
        },
        "shape": "Cube",
        "type": "Box",
        "userData": "{\"grabbableKey\":{\"grabbable\":false}}"
        });*/

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
        enabled: true
    });

    anchor = Overlays.addOverlay("sphere", {
        "solid": true,
        "grabbable": true,
        "position": calculateKeyboardPosition(),
        "dimensions": {x: 0.01, y: 0.01, z: 0.01},
        "ignoreRayIntersection": false
    });
    var localPos = {x: 0.05, y: 0.0, z: 0.0};
    secondKey = Overlays.addOverlay("cube", {
        "solid": true,
        "parentID": anchor,
        "visible": true,
        //"url": DEFAULT_KEY_MODEL,
        "alpha": 0.7,
        "localPosition": {x: 0.05, y: 0.0, z: 0.0},
        "dimensions": {x: 0.04, y: 0.04, z: 0.009},
        //"textures": {"tex.picture": "http://hifi-content.s3.amazonaws.com/alexia/Keyboard/KeysBlack/P_key_black.png"},
        "ignoreRayIntersection": false
    });

    var debugOverlay = Overlays.addOverlay("sphere", {
        solid: true,
        color: {red: 255, blue: 0, green: 0},
        parentID: secondKey,
        dimensions: {x: 0.003, y: 0.003, z: 0.003},
        ignoreRayIntersection: false,
        visible: true,
        alpha: 1.0
    });

    var pressedKeys = {
        secondKey: false
    };

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
        Pointers.removePointer(leftStylusPointer);
        Pointers.removePointer(rightStylusPointer);
    }

    function mousePressOnOverlay(overlayID, event) {
        if (overlayID === secondKey && event.button === "Primary") {
             if (event.id === leftStylusPointer) {
                Controller.triggerHapticPulse(0.6, 3, 0);
            } else if (event.id === rightStylusPointer) {
                Controller.triggerHapticPulse(0.6, 3, 1);
            }

            var overlayPosition = Overlays.getProperty(anchor, "position");
            var overlayOrientation = Overlays.getProperty(anchor, "orientation");
            var worldPosition = event.pos3D;

            var overlayXform = new Xform(overlayOrientation, overlayPosition);
            var overlayInv = overlayXform.inv();
            lastLocalPosition = overlayInv.xformPoint(worldPosition);
         
            print("mousePressOnOverlay");
        }
    }

    function mouseMoveOnOverlay(overlayID, event) {
        if (overlayID === secondKey && event.button === "Primary") {
            if (true) { //!pressedKeys[overlayID]) {
                pressedKeys[overlayID] = true;
                var worldPosition = event.pos3D;
                var pickResult = Pointers.getPrevPickResult(event.id);
                //print(JSON.stringify(pickResult) + "\n");
                Overlays.editOverlay(debugOverlay, {"position": pickResult.stylusTip.position});
                var overlayPosition = Overlays.getProperty(overlayID, "position");
                var overlayOrientation = Overlays.getProperty(overlayID, "orientation");
                var overlayXform = new Xform(overlayOrientation, overlayPosition);
                var overlayXformInv = overlayXform.inv();

                var stylusTipOverlay = overlayXformInv.xformPoint(pickResult.stylusTip.position);

                var offset = stylusTipOverlay.z - 0.009;
                Overlays.editOverlay(secondKey, {localPosition: Vec3.sum(localPos, {x: 0, y: 0, z: offset / 4})});
                print(offset);
            }
        }
    }

    function mouseReleaseOnOverlay(overlayID, event) {
        if (overlayID === secondKey && event.button === "Primary") {
            pressedKeys[overlayID] = false;
            Overlays.editOverlay(secondKey, {"localPosition": localPos});
        }
    }

    Overlays.mousePressOnOverlay.connect(mousePressOnOverlay);
    Overlays.mouseReleaseOnOverlay.connect(mouseReleaseOnOverlay);
    Overlays.mouseMoveOnOverlay.connect(mouseMoveOnOverlay);
    Script.scriptEnding.connect(cleanup);
}());
