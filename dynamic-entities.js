"use strict";

/* global Entities, MyAvatar, Vec3, Quat */

(function() {
    var avRot = MyAvatar.orientation;
    var avRotEulers = Quat.safeEulerAngles(avRot);

    var sphereID = Entities.addEntity({
        type: "Sphere",
        color: { red: 255, green: 0, blue: 0 },
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.4, z: -1.2 })),
        rotation: Quat.multiply(Quat.fromVec3Degrees({ x: 0, y: avRotEulers.y, z: 0 }),
                                Quat.fromVec3Degrees({ x: -90, y: 0, z: 0 })),
        dynamic: true
    });

    var boxID = Entities.addEntity({
        type: "Box",
        color: { red: 0, green: 0, blue: 255},
        localPosition: { x: 0.1, y: 0.1, z: 0.1 },
        parentID: sphereID,
        dynamic: true
    });

    function nullParent() {
        Entities.editEntity(boxID, { parentID: null });
    }
    function handleMessage(channel, message, sender) {
        var data = JSON.parse(message);
        if (data.grabbedEntity === sphereID) {
            //Script.setTimeout(nullParent, 600);
        }
    }

    Messages.subscribe('Hifi-Object-Manipulation');
    Messages.messageReceived.connect(handleMessage);

    function cleanup() {
        Entities.deleteEntity(sphereID);
        Entities.deleteEntity(boxID);
    }
    Script.scriptEnding.connect(cleanup);
}());
