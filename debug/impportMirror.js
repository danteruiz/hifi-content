"use strict";

function putEntityAcrossFromAvatar( avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

var entities = [];
print("importing");
var local = "http://localhost:8000/mirror.json";
var not_local = "https://hifi-content.s3.amazonaws.com/dante/entities/mirror.json";
var success = Clipboard.importEntities(not_local);
var position = Vec3.ZERO;
var pastedEntities = Clipboard.pasteEntities(position);
for (var index = 0; index < pastedEntities.length; index++) {
    print(index);
    var entityID = pastedEntities[index];
    print(entityID);
    var entityProperties = Entities.getEntityProperties(entityID);
    print(JSON.stringify(entityProperties.position));

    Script.setTimeout(function() {
        entityProperties.position = putEntityAcrossFromAvatar(MyAvatar);
        print(JSON.stringify(entityProperties.position));
        Entities.editEntity(entityID, entityProperties);
        entities.push(entityID);
    }, 500);
}


Script.scriptEnding.connect(function() {
    entities.forEach(function(entityID) {
        print("deleting entity " + entityID);
        Entities.deleteEntity(entityID);
    });
});
