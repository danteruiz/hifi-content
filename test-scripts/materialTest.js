(function() {
    var material = Entities.addEntity({
        type: "Material",
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.3, z: -1 })),
        visible: true,
        materialURL: "materialData",
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                name: "gold",
                albedo: [1.0, 0.86, 0.0],
                roughness: 0.745,
                metallic: 1.0,
                roughnessMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_roughness.png",
                normalMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_normal.png",
                specularMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_metallic.png",
                albedoMap: "https://dantescalves.com/hifi-content/images/gold-scuffed_basecolor-boosted.png",
                emissiveMap: "https://dantescalves.com/hifi-content/images/glod-scuffed_basecolor.png"
            }
        }, true)
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(material);
    });
}());
