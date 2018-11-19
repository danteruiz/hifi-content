(function() {

    var materialEntities = [];
    var goldMaterial = {
        type: "Material",
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.3, z: -1 })),
        visible: true,
        priority: 1,
        materialURL: "materialData",
        parentID: HMD.tabletID,
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
    };


    var tabletID = HMD.tabletID;
    if (tabletID !== Uuid.NULL && tabletID !== null) {
	    var model = Graphics.getModel(HMD.tabletID);
        for (var index = 1; index <= model.meshes.length + 1; index++) {
            print("mesh name: " + model.meshes[index].objectName + " index: " + (index));
            goldMaterial.parentMaterialName = index;
            var entityID = Entities.addEntity(goldMaterial, true);
            materialEntities.push(entityID);
        }
    }

    Script.scriptEnding.connect(function() {
        materialEntities.forEach(function(entityID) {
            Entities.deleteEntity(entityID);
        });
    });
}());
