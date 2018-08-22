// drumStickPlacement


(function() {
    var DRUM_STICK_MODEL = "http://hifi-content.s3.amazonaws.com/alexia/Keyboard/drumstick.fbx";
    var leftHandJointIndex = MyAvatar.getJointIndex("LeftHand");
    var rightHandJointIndex = MyAvatar.getJointIndex("RightHand");
    var drumStick = Entities.addEntity({
        name: "LeftDrumStick",
        type: "Model",
        localPosition: {x: 0.0, y: 0.3, z: 0.04},
        localRotation: Quat.IDENTITY,
        color: { red: 23, green: 17, blue: 17 },
        collisionless: false,
        shapeType: "simple-compound",
        modelURL: DRUM_STICK_MODEL,
        dynamic: true,
        dimensions : {x: 1.0, y: 1.0, z: 1.0},
        parentID: MyAvatar.sessionUUID,
        parentJointIndex: leftHandJointIndex
    });

    var drumSt = Entities.addEntity({
        name: "RightDrumStick",
        type: "Model",
        localPosition: {x: 0.0, y: 0.3, z: 0.04},
        localRotation: Quat.IDENTITY,
        color: { red: 23, green: 17, blue: 17 },
        collisionless: false,
        shapeType: "simple-compound",
        modelURL: DRUM_STICK_MODEL,
        dynamic: true,
        dimensions : {x: 1.0, y: 1.0, z: 1.0},
        parentID: MyAvatar.sessionUUID,
        parentJointIndex: rightHandJointIndex
    });
    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(drumStick);
        Entities.deleteEntity(drumSt);
    });
}());
