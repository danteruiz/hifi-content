
(function() {
    var FIVE_KEY = 53;
    var SIX_KEY = 54;
    var SEVEN_KEY = 55;
    var EIGHT_KEY = 56;

    var SHAPE_ENTITY_KEY = 83;
    var WEB_ENTITY_KEY = 86;
    var TEXT_ENTITY_KEY = 84;
    var LIGHT_ENTITY_KEY = 71;
    var LINE_ENTITY_KEY = 79;
    var PARTICLE_ENTITY_KEY = 90;
    var POLY_VOX_ENTITY_KEY = 89;
    var POLY_LINE_ENTITY_KEY = 88;
    
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
        "v -> Web Entity \n" +
        "z -> Particle Entity \n";

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
        print("creating webEntity");
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
        clear();
        print("creating lineEntity");
        var lineProperties = {
            type: "Line",
            name: "LineTestEntity",
            localPosition: Vec3.ZERO,
            parentID: MyAvatar.sessionUUID,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: { x: 2, y: 2, z: 1 },
            linePoints: [
                { x: -1, y: 1, z: 0 },
                { x: 0, y: -1, z: 0 },
                { x: 1, y: 1, z: 0 }
            ],
            lineWidth: 13,
            color: { red: 255, green: 255, blue: 255 }
        };

        entity1 = Entities.addEntity(lineProperties, true);
    }

    function lightEntity() {
        clear();
        print("creating lightEntity");
        var lightProperties = {
            type: "Light",
            name: "LightTestEntity",
            localPosition: Vec3.ZERO,
            parentID: MyAvatar.sessionUUID,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: { x: 4, y: 4, z: 4 },
            intensity: 100
        };
        entity1 = Entities.addEntity(lightProperties, true);
    }

    function particleEffectEntity() {
        clear();
        print("creating ParticleEntity");
        var particleEffectProperties = {
            type: "ParticleEffect",
            name: "ParticleEffectTestEntity",
            localPosition: Vec3.ZERO,
            parentID: MyAvatar.sessionUUID,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: DEFAULT_DIMENSIONS,
            lifespan: 5,
            emitRate: 10,
            emitSpeed: 0.02,
            speedSpread: 0.01,
            emitAcceleration: { x: 0, y: 0.02, z: 0 },
            polarFinish: Math.PI,
            textures: "https://content.highfidelity.com/DomainContent/production/Particles/wispy-smoke.png",
            particleRadius: 0.1,
            color: { red: 0, green: 255, blue: 0 },
            alphaFinish: 0
        };

        entity1 = Entities.addEntity(particleEffectProperties, true);
    }

    function polyLineEntity() {
        clear();
        print("creating PolyLineEntity");
        var polyLineProperties = {
            type: "PolyLine",
            name: "PolyLineTestEntity",
            localPosition: Vec3.ZERO,
            parentID: MyAvatar.sessionUUID,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: DEFAULT_DIMENSIONS,
            linePoints: [
                { x: -1, y: 0.5, z: 0 },
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0.5, z: 0 }
            ],
            normals: [
                { x: 0, y: 0, z: 1 },
                { x: 0, y: 0, z: 1 },
                { x: 0, y: 0, z: 1 }
            ],
            strokeWidths: [ 0.1, 0.1, 0.1 ],
            color: { red: 255, green: 0, blue: 0 },
            textures: "http://hifi-production.s3.amazonaws.com/DomainContent/Toybox/flowArts/trails.png",
            isUVModeStretch: true
        };

        entity1 = Entities.addEntity(polyLineProperties, true);
    }

    function polyVoxEntity() {
        clear();
        print("creating polyVox Entity");
        var texture = "http://public.highfidelity.com/cozza13/tuscany/Concrete2.jpg";
        var polyVoxProperties = {
            type: "PolyVox",
            name: "PolyVoxTestEntity",
            localPosition: Vec3.ZERO,
            parentID: MyAvatar.sessionUUID,
            parentJointIndex: HEAD_JOINT_INDEX,
            dimensions: {x: 2, y: 2, z: 2},
            xTextureURL: texture,
            yTextureURL: texture,
            zTextureURL: texture
        };

        entity1 = Entities.addEntity(polyVoxProperties, true);
        Entities.setVoxelSphere(entity1, MyAvatar.position, 0.2, 255);
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

            case LIGHT_ENTITY_KEY:
                lightEntity();
                break;

            case LINE_ENTITY_KEY:
                lineEntity();
                break;

            case PARTICLE_ENTITY_KEY:
                particleEffectEntity();
                break;

            default:
                break;
            }
        }
    }

    Controller.keyPressEvent.connect(keyPressEvent);

    Script.scriptEnding.connect(cleanup);
})();
