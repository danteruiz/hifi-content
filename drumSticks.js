// drumSticks.js


(function() {

    var DRUM_STICK_MODEL = "http://hifi-content.s3.amazonaws.com/alexia/Keyboard/drumstick.fbx";

    function DrumSticks() {
        var _this = this;
        _this.entity = null;
        _this.leftDrumStick = null;
        _this.rightDrumStick = null;
        _this.leftHandJointIndex = null;
        _this.rightHandJointIndex = null;
        this.preload = function(entityID) {
            _this.entity = entityID;
            _this.rightHandJointIndex = MyAvatar.getJointIndex("_CAMERA_RELATIVE_CONTROLLER_RIGHTHAND");
            _this.leftHandJointIndex = MyAvatar.getJointIndex("_CAMERA_RELATIVE_CONTROLLER_LEFTHAND");
        };

        this.enterEntity = function(entity) {
            print(_this.leftHandJointIndex);
            _this.leftDrumStick = Entities.addEntity({
                name: "LeftDrumStick",
                type: "Model",
                localPosition: {x: 0.0, y: 1.0, z: 0.0},
                localRotation: Quat.IDENTITY,
                modelURL: DRUM_STICK_MODEL,
                dimensions : {x: 1.0, y: 1.0, z: 1.0},
                parentID: MyAvatar.sessionUUID,
                parentJointIndex: _this.leftHandJointIndex
            });

            _this.rightDrumStick = Entities.addEntity({
                name: "RightDrumStick",
                type: "Model",
                localPosition: Vec3.ZERO,
                localRotation: Quat.IDENTITY,
                localPosition: {x: 0.0, y: 1.0, z: 0.0},
                modelURL: DRUM_STICK_MODEL,
                dimensions : {x: 1.0, y: 1.0, z: 1.0},
                parentID: MyAvatar.sessionUUID,
                parentJointIndex: _this.rightHandJointIndex
            });
        };

        this.leaveEntity = function(enity) {
            Entities.deleteEntity(_this.leftDrumStick);
            Entities.deleteEntity(_this.rightDrumStick);
            _this.leftDrumStick = null;
            _this.rightDrumStick = null;
        };
    }


    return new DrumSticks();
});
