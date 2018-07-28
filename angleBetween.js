// angle Between

(function() {
    Script.include("/~/system/libraries/utils.js");
    Script.include("/~/system/libraries/controllers.js");
    Script.include("/~/system/libraries/Xform.js");
    DebugAngle = {
        handToHeadVector: {x: 0, y: 0, z: 0},
        xzAngle: 0,
        yzAngle: 0,
        angle: 0
    };
    var TARGET_UPDATE_HZ = 60; // 50hz good enough, but we're using update
    var BASIC_TIMER_INTERVAL_MS = 1000 / TARGET_UPDATE_HZ;
    var angle = 0;
    function update() {
        var controllerLocation = getControllerWorldLocation(Controller.Standard.RightHand, true);
        var Y_FLIP = Quat.fromPitchYawRollDegrees(0, 180, 0);
        var headOrientation = HMD.orientation;
        var headOrientationYFlipped = Quat.multiply(headOrientation, Y_FLIP);
        // var hmdXform = new Xform(HMD.orientation, HMD.position);
        var hmdForward = Vec3.multiplyQbyV(headOrientationYFlipped, Vec3.UNIT_Z);

        var headToHandVector = Vec3.subtract(controllerLocation.position, HMD.position);

        var headToHandVectorNormalized = Vec3.normalize(headToHandVector);

        var XZPlane = Vec3.multiplyVbyV(headToHandVectorNormalized, Vec3.UNIT_XZ);
        var YZPlane = Vec3.multiplyVbyV(headToHandVectorNormalized, Vec3.UNIT_YZ);
        // var hmdXYPlane = Vec3.multiplyVbyV(hmdForward, Vec3.UNIT_XY);
        // var hmdYZPlane = Vec3.multiplyVbyV(hmdForward, Vec3.UNIT_YZ);
        DebugAngle.angle = Vec3.dot(Vec3.normalize(hmdForward), headToHandVectorNormalized);
        DebugAngle.xzAngle = Vec3.dot(Vec3.normalize(hmdForward), XZPlane);
        DebugAngle.yzAngle = Vec3.dot(Vec3.normalize(hmdForward), YZPlane);
        print(DebugAngle.xzAngle);

        Script.setTimeout(update, BASIC_TIMER_INTERVAL_MS);
    }

    Script.registerValue("angleBetween", DebugAngle);
    Script.setTimeout(update, BASIC_TIMER_INTERVAL_MS);
}());
