(function() {
    var BUTTON_PROPERTIES = {
        text: "Find Material"
    };
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton(BUTTON_PROPERTIES);

    button.clicked.connect(onClicked);
    function onClicked() {
        findMaterialEntities();
    }


    function findMaterialEntities() {
        var TABLET_MATERIAL_ENTITY_NAME = 'Tablet-Material-Entity';
        var avatarEntityData = MyAvatar.getAvatarEntityData();

        var count = 0;
        for (var entityID in avatarEntityData) {
            var entityName =  Entities.getEntityProperties(entityID, ["name"]).name;
            if (entityName === TABLET_MATERIAL_ENTITY_NAME) {
                count++;
            }
        }

        print("Found: " + count + " avatar material entities");
    }

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }

        tablet.removeButton(button);
    });
}()); 
