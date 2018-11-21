// Bling.js

/* global print, Graphics, Script, HMD, Tablet */
(function() {
    var BLING_TABLET_SOURCE = Script.resolvePath("./qml/Bling.qml");
    var BLING_ACTIVE_SVG = Script.resolvePath("./images/Bling-Active.svg");
    var BLING_INACTIVE_SVG = Script.resolvePath("./images/Bling-Inactive.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var materialEntities = [];

    var tabletSkinList = {
        "gold": {
            applyToAll: true,
            material: {
                type: "Material",
                position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.3, z: -1 })),
                visible: true,
                priority: 1,
                materialURL: "materialData",
                paretMaterialName: "#polySurface99",
                materialData: JSON.stringify({
                    materialVersion: 1,
                    materials: {
                        name: "gold",
                        albedo: [1.0, 0.79, 0.0],
                        roughness: 0.745,
                        metallic: 1.0,
                        roughnessMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_roughness.png",
                        normalMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_normal.png",
                        specularMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_metallic.png",
                        albedoMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_basecolor-boosted.png",
                        emissiveMap: "https://dantescalves.com/hifi-content/images/glod-scuffed_basecolor.png"
                    }
                })
            }
        }
    };

    var isOpened = false;

    var buttonProperties = {
        text: "BLING",
	    icon: BLING_INACTIVE_SVG
    };
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);

    function applyMaterialToAll(material) {
        var tabletID = HMD.tabletID;
        if (tabletID !== Uuid.NULL && tabletID !== null) {
	        var model = Graphics.getModel(HMD.tabletID);
            for (var index = 0; index <= model.meshes.length + 1; index++) {
                material.parentID = tabletID;
                material.parentMaterialName = index;
                var entityID = Entities.addEntity(material, true);
                materialEntities.push(entityID);
            }
        }
    }

    function clearMaterialEntities() {
        materialEntities.forEach(function(entityID) {
            Entities.deleteEntity(entityID);
        });
    }

    function applyTabletSkin(skinData) {
        clearMaterialEntities();
        if (skinData.applyToAll) {
            applyMaterialToAll(skinData.material);
        }
    }

    function onClicked() {
	    if (!isOpened) {
            tablet.loadQMLSource(BLING_TABLET_SOURCE);
	    } else {
	        tablet.gotoHomeScreen();
	    }

	    isOpened = !isOpened;

        button.editProperties({
            isActive: isOpened,
            icon: isOpened ? BLING_ACTIVE_SVG : BLING_INACTIVE_SVG
        });
    }

    function sendSkinsToQml() {
        var message = {
            bling: true,
            action: "updateList",
            data: {
                skins: tabletSkinList
            }
        };

        tablet.sendToQml(message);
    }

    function fromQml(message) {
        if (message.hasOwnProperty("bling")) {
            var action = message.action;

            if (action === "initialize") {
                sendSkinsToQml();
            } else if (action === "clearActiveSkin") {
                print("clear active skin");
                clearMaterialEntities();
            } else if (action === "applySkin") {
                applyTabletSkin(message.data);
            }
        } else {
        }
    }

    tablet.fromQml.connect(fromQml);

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
        clearMaterialEntities();
    });
}());
