var entity = "df499587-4e22-447f-859a-96d7ac3d72ce";


function printProperties() {
    var properties = Entities.getEntityProperties(entity);
    //print(JSON.stringify(properties));
    print(properties.parentID);
    Settings.setValue("favoriteAvatar", "Test");
}


Script.update.connect(printProperties);
