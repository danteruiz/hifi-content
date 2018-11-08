(function() {
    var material = Entities.addEntity({
        type: "Material",
        position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0.67, z: -2 })),
        visible: true,
        materialURL: "materialData",
        materialData: JSON.stringify({
            materialVersion: 1,
            materials: {
                name: "gold",
                albedo: [1.0, 0.86, 0.0],
                roughness: 0.745,
                metallic: 1.0,
                roughnessMap: "http://localhost:8000/gold-scuffed_roughness.png",
                normalMap: "http://localhost:8000/gold-scuffed_normal.png",
                specularMap: "http://localhost:8000/gold-scuffed_metallic.png",
                albedoMap: "http://localhost:8000/gold-scuffed_basecolor-boosted.png",
                emissiveMap: "http://localhost:8000/glod-scuffed_basecolor.png"
            }
        }, true)
    });

    Script.scriptEnding.connect(function() {
        Entities.deleteEntity(material);
    });
}());
