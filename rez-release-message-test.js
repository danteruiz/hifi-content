"use strict";

/* global Entities, MyAvatar, Vec3, Quat */

(function() { // BEGIN LOCAL_SCOPE

    var avRot = MyAvatar.orientation;
    var avRotEulers = Quat.safeEulerAngles(avRot);
    var lifetime = 600;

    var width = 0.2;
    var height = 0.2;
    var thickness = 0.08;
    var lightSize = 0.09;

    var baseID = Entities.addEntity({
        name: "trigger test base",
        type: "Box",
        color: { red: 128, green: 128, blue: 128 },
        dimensions: { x: width, y: height, z: thickness },
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.1, z: -1.2 })),
        rotation: Quat.multiply(Quat.fromVec3Degrees({ x: 0, y: avRotEulers.y, z: 0 }),
                                Quat.fromVec3Degrees({ x: -90, y: 0, z: 0 })),
        dynamic: 0,
        userData: JSON.stringify({ grabbableKey: { grabbable: false, wantsTrigger: true } }),
        lifetime: lifetime
    });


    var lightID = Entities.addEntity({
        name: "trigger test nearTrigger start",
        type: "Sphere",
        color: { red: 128, green: 0, blue: 0 },
        dimensions: { x: lightSize, y: lightSize, z: lightSize },
        localPosition: { x: width/22, y: height/22, z: thickness/2 },
        parentID: baseID,
        dynamic: 0,
        userData: JSON.stringify({ grabbableKey: { grabbable: false, wantsTrigger: false } }),
        lifetime: lifetime
    });

    function handleMessage(channel, message, sender) {
        var data;
        if (sender === MyAvatar.sessionUUID) {
            if (channel === 'Hifi-Object-Manipulation') {
                data = JSON.parse(message);
                if (data.action === "release") {
                    Entities.editEntity(lightID, { color: { blue: 0, green: 0, red: 255}});
                } else if (data.action === "grab") {
                    Entities.editEntity(lightID, { color: { blue: 0, green: 255, red: 0 }});
                }
            }
        }
    }

    function cleanup() {
        print("-----------> cleaning up <-------------");
        Entities.deleteEntity(lightID);
        Entities.deleteEntity(baseID);
    }

    Messages.subscribe('Hifi-Object-Manipulation');
    Messages.messageReceived.connect(handleMessage);

    Script.scriptEnding.connect(cleanup);
}()); // END LOCAL_SCOPE
