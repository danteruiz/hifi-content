(function() {
    var tabletMesh = Graphics.getModel(HMD.tabletID);

   /* print(Object.keys(tabletMesh.meshes[0]));
    print("\n" + "\n");

    print(JSON.stringify(tabletMesh.meshes[0].bufferFormats.position));
    print("\n" + "\n");

    print(JSON.stringify(tabletMesh.meshes[0].parts));
    print("\n" + "\n");*/


    var vertices = [{x: 0, y: 0, z: 0}, {x: 0, y: 20, z: 0}, {x: 20, y: 0, z: 0}];
    var indices = [0, 1, 2];
    var colors =  [{red: 255, blue: 0, green: 0}, {red: 255, blue: 0, green: 0}, {red: 255, blue: 0, green: 0}];
    var normals = [{x: 0, y: 0, z: 0 }, {x: 0, y: 0, z: 0}, {x: 1, y: 0, z: 0}];

    var meshData = {
        positions: vertices,
        topology: "triangles",
        indices: indices,
        normals: normals,
        colors: colors
    };

    var myMesh = Graphics.newMesh(meshData);
    var myModel = Graphics.newModel([myMesh]);

    Graphics.updateModel(HMD.tabletID, myModel);
    print(JSON.stringify(myModel));
}());
