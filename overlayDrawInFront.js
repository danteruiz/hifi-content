/* jslint bitwise: true */

/* global Script, Controller, RIGHT_HAND, LEFT_HAND, Mat4, MyAvatar, Vec3, Camera, Quat,
   getGrabPointSphereOffset, getEnabledModuleByName, makeRunningValues, Entities,
   enableDispatcherModule, disableDispatcherModule, entityIsDistanceGrabbable, entityIsGrabbable,
   makeDispatcherModuleParameters, MSECS_PER_SEC, HAPTIC_PULSE_STRENGTH, HAPTIC_PULSE_DURATION,
   PICK_MAX_DISTANCE, COLORS_GRAB_SEARCHING_HALF_SQUEEZE, COLORS_GRAB_SEARCHING_FULL_SQUEEZE, COLORS_GRAB_DISTANCE_HOLD,
   DEFAULT_SEARCH_SPHERE_DISTANCE, TRIGGER_OFF_VALUE, TRIGGER_ON_VALUE, ZERO_VEC, ensureDynamic, Vec3,
   getControllerWorldLocation, projectOntoEntityXYPlane, ContextOverlay, HMD, Reticle, Overlays, isPointingAtUI
   Picks, makeLaserLockInfo Xform, makeLaserParams, AddressManager, getEntityParents, Selection, DISPATCHER_HOVERING_LIST
*/


(function() {
    var overlay = null;
    var overlays = [];
    var entities = [];
    var drawInFront = false;
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton({
        text: "Draw in front"
    });

    function putInFrontOfAvatar(rotationOffset) {
        var avatarRotation = Quat.fromPitchYawRollDegrees(0.0, MyAvatar.bodyYaw + rotationOffset, 0.0);
        var position = Vec3.sum(MyAvatar.position, Vec3.multiply(2, Quat.getFront(avatarRotation)));
        return position;
    }

    function onClicked() {
        drawInFront = !drawInFront;
        overlays.forEach(function(overlayID) {
            var overlayProperties = {
                drawInFront: drawInFront
            };
            Overlays.editOverlay(overlayID, overlayProperties);
        });
    }

    function createOverlays() {
        var overlayID = Overlays.addOverlay("model", {
            url: "http://hifi-content.s3.amazonaws.com/dante/entities/ring-w-glow.fbx",
            position: putInFrontOfAvatar(0)
        });

        overlays.push(overlayID);

        overlayID = Overlays.addOverlay("model", {
            url: "http://hifi-content.s3.amazonaws.com/alan/dev/loading-progress.fbx",
            dimensions: { x: 0.1, y: 0.1, z: 0.1 },
            position: putInFrontOfAvatar(180)
        });

        overlays.push(overlayID);


        overlay = Overlays.addOverlay("cube", {
            position: putInFrontOfAvatar(90),
            alpha: 1,
            isSolid: true,
            emissive: true,
            color: {red: 31, green: 198, blue: 166}
        });

        overlays.push(overlay);
    }

    button.clicked.connect(onClicked);

    function update() {
        var overlayProp = {
            position:  putInFrontOfAvatar(90)
        };
        Overlays.editOverlay(overlay, overlayProp);
    }

    function cleanup() {
        button.clicked.disconnect(onClicked);
        if (tablet) {
            tablet.removeButton(button);
        }

        overlays.forEach(function(overlayID) {
            Overlays.deleteOverlay(overlayID);
        });

        entities.forEach(function(entityID) {
            Entities.deleteEntity(entityID);
        });
    }

    createOverlays();
    // Script.update.connect(update);
    Script.scriptEnding.connect(cleanup);
})();
