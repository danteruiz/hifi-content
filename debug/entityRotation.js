'use strict';

(function () {
    var TARGET_UPDATE_HZ = 60; // 50hz good enough, but we're using update
    var BASIC_TIMER_INTERVAL_MS = 1000 / TARGET_UPDATE_HZ;

    var thisInterval = Date.now();
    var lastInterval = thisInterval;
    function putOverlayAcrossFromAvatar( avatar) {
        var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
        var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
        return position;
    }

    var entity = Entities.addEntity({
        name: "rotateEntity",
        type: "Box",
        registrationPoint: { x: 0.0, y: 0.0, z: 0.0 },
        position: putOverlayAcrossFromAvatar(MyAvatar),
        alpha: 0.4
    }, true);

    function rotateEntity() {
        thisInterval = Date.now();

        var deltaTimeMsec = thisInterval - lastInterval;
        var deltaTime = deltaTimeMsec / 1000;
        var deltaRotation = Quat.fromPitchYawRollDegrees(0, deltaTime, 0);

        var entityProps = Entities.getEntityProperties(entity);
        var finalRotation = Quat.multiply(entityProps.rotation, deltaRotation);

        Entities.editEntity(entity, { rotation: finalRotation });
        Script.setTimeout(rotateEntity, BASIC_TIMER_INTERVAL_MS);
    }


    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(entity);
    });
    //Script.setTimeout(rotateEntity, BASIC_TIMER_INTERVAL_MS);
}());
