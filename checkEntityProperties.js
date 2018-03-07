function checkEntityProperties(entityID, event) {
    var entityProperties = Entities.getEntityProperties(entityID);

    if (entityProperties) {
        print("Is Entity locked: " + entityProperties.locked);
        print("Last edited by: " + entityProperties.lastEditedBy);
    }
}

Entities.mousePressOnEntity.connect(checkEntityProperties);
