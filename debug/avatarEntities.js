(function () {

   var TABLET_MATERIAL_ENTITY_NAME = 'Tablet-Material-Entity';
   var avatarEntityData = MyAvatar.getAvatarEntityData();
    for (var entityID in avatarEntityData) {
        var entityName =  Entities.getEntityProperties(entityID, ["name"]).name;
        if (entityName === TABLET_MATERIAL_ENTITY_NAME) {
            print("deleting matetial entity" + entityID);
            //Entities.deleteEntity(entityID);
        }
    }
}());
