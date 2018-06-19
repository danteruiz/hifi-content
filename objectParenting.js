
(function() {
    var FIVE_KEY = 53;
    var SIX_KEY = 54;
    var SEVEN_KEY = 55;
    var EIGHT_KEY = 56;

    var SHAPE_ENTITY_KEY = 83;
    var WEB_ENTITY_KEY = 86;
    var TEXT_ENTITY_KEY = 84;
    var UPDATE_FACING_KEY = 70;

    var instructionsOverlay = null;
    var overlay1 = null;
    var overlay2 = null;
    var entity1 = null;
    var entity2 = null;

    var HEAD_JOINT_INDEX = MyAvatar.getJointIndex("Head");
    var DEFAULT_DIMENSIONS = {x: 0.3, y: 0.3, z: 0.3};
    var instructionText =
        "Parent Entity Test \n" +
        "Press the specified key to get entity type \n \n" +
        "s -> Shape Entity \n" +
        "t -> Text Entity \n" +
        "v -> Web Entity \n";

    instructionsOverlay = Overlays.addOverlay("text", {
        text: instructionText,
        x: 10,
        y: 10,
        width: 400,
        height: 400
    });

    var faceCamera = false;

    function cleanup() {
        Overlays.deleteOverlay(instructionsOverlay);
        Overlays.deleteOverlay(overlay1);
        Overlays.deleteOverlay(overlay2);
        Entities.deleteEntity(entity1);
        Entities.deleteEntity(entity2);
    }

    function clear() {
        Overlays.deleteOverlay(overlay1);
        Overlays.deleteOverlay(overlay2);
        Entities.deleteEntity(entity2);
        Entities.deleteEntity(entity1);
        overlay1 = null;
        overlay2 = null;
        entity1 = null;
        entity2 = null;
    }

    function parentEntityAvatar() {
    }

    function parentEntityOverlay() {
    }

    function parentAvatarEntity() {
    }

    function parentAvatarEntityOverlay() {
    }

    function shapeEntity() {
        clear();
        var shapeProperties = {
            name: "shapeTestEntity",
            type: "Box",
            parentID: MyAvatar.sessionUUID,
            localPosition: Vec3.ZERO,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: DEFAULT_DIMENSIONS
        };

        entity1 = Entities.addEntity(shapeProperties, true);
    }

    function textEntity() {
        clear();
        var textProperties = {
            name: "textTestEntity",
            type: "Text",
            text: "This is just a test",
            parentID: MyAvatar.sessionUUID,
            localPosition: Vec3.ZERO,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: DEFAULT_DIMENSIONS,
            faceCamera: faceCamera
        };
        entity1 = Entities.addEntity(textProperties, true);
    }

    function materialEntity() {
    }

    function modelEntity() {
    }

    function webEntity() {
        clear();
        var webProperties = {
            type: "Web",
            name: "WebTestEntity",
            sourceUrl: "https://highfidelity.com/",
            parentID: MyAvatar.sessionUUID,
            localPosition: Vec3.ZERO,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: DEFAULT_DIMENSIONS
        };

        entity1 = Entities.addEntity(webProperties, true);
    }

    function lineEntity() {
    }


    function keyPressEvent(event) {
        if (!event.isAutoRepeat) {
            var key = event.key;
            print("Key Pressed: " + key);

            switch (key) {
            case SHAPE_ENTITY_KEY:
                shapeEntity();
                break;

            case WEB_ENTITY_KEY:
                webEntity();
                break;

            case TEXT_ENTITY_KEY:
                textEntity();
                break;

            case UPDATE_FACING_KEY:
                faceCamera = !faceCamera;
                textEntity();
                break;

            default:
                break;
            }
        }
    }

    Controller.keyPressEvent.connect(keyPressEvent);

    Script.scriptEnding.connect(cleanup);
})();
