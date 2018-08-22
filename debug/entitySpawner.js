//
// spawnerEntity.js
//

 (function() {

    const ZERO_UUID = '{00000000-0000-0000-0000-000000000000}';
    const SANETIZE_PROPERTIES = ['childEntities', 'parentID', 'id'];

    const TRIGGER_SOUND_URL = 'http://hifi-content.s3.amazonaws.com/DomainContent/Tutorial/Sounds/advance.L.wav';

    var triggerSound = null;
    var lastUserData = null;
    var parsedUserData = null;
    var rezEntityTree = [];

    function entityListToTree(entitiesList) {
        function entityListToTreeRecursive(properties) {
            properties.childEntities = [];
            entitiesList.forEach(function(entityProperties) {
                if (properties.id === entityProperties.parentID) {
                    properties.childEntities.push(entityListToTreeRecursive(entityProperties));
                }
            });
            return properties;
        }
        var entityTree = [];
        entitiesList.forEach(function(entityProperties) {
            if (entityProperties.parentID === undefined || entityProperties.parentID === ZERO_UUID) {
                entityTree.push(entityListToTreeRecursive(entityProperties));
            }
        });
        return entityTree;
    }

    // TODO: ATP support (currently the JS API for ATP does not support file links, only hashes)
    function importEntitiesJSON(importLink, parentProperties, overrideProperties) {
        if (parentProperties === undefined) {
            parentProperties = {};
        }
        if (overrideProperties !== undefined) {
            parentProperties.overrideProperties = overrideProperties;
        }
        var request = new XMLHttpRequest();
        request.open('GET', importLink, false);
        request.send();
        try {
            var response = JSON.parse(request.responseText);
            parentProperties.childEntities = entityListToTree(response.Entities);
            return parentProperties;
        } catch (e) {
            print('Failed importing entities JSON because: ' + JSON.stringify(e));
        }
        return null;
    }

    //Creates an entity and returns a mixed object of the creation properties and the assigned entityID
    var createEntity = function(entityProperties, parent, overrideProperties) {
        // JSON.stringify -> JSON.parse trick to create a fresh copy of JSON data
        var newEntityProperties = JSON.parse(JSON.stringify(entityProperties));
        if (overrideProperties !== undefined) {
            Object.keys(overrideProperties).forEach(function(key) {
                newEntityProperties[key] = overrideProperties[key];
            });
        }
        if (parent.rotation !== undefined) {
            if (newEntityProperties.rotation !== undefined) {
                newEntityProperties.rotation = Quat.multiply(parent.rotation, newEntityProperties.rotation);
            } else {
                newEntityProperties.rotation = parent.rotation;
            }
        }
        if (parent.position !== undefined) {
            var localPosition = (parent.rotation !== undefined) ?
                Vec3.multiplyQbyV(parent.rotation, newEntityProperties.position) : newEntityProperties.position;
            newEntityProperties.position = Vec3.sum(localPosition, parent.position)
        }
        if (parent.id !== undefined) {
            newEntityProperties.parentID = parent.id;
        }
        newEntityProperties.id = Entities.addEntity(newEntityProperties);
        return newEntityProperties;
    };

    var createEntitiesFromTree = function(entityTree, parent, overrideProperties) {
        if (parent === undefined) { 
            parent = {};
        }
        if (parent.overrideProperties !== undefined) {
            overrideProperties = parent.overrideProperties;
        }
        var createdTree = [];
        entityTree.forEach(function(entityProperties) {
            var sanetizedProperties = {};
            Object.keys(entityProperties).forEach(function(propertyKey) {
                if (!entityProperties.hasOwnProperty(propertyKey) || SANETIZE_PROPERTIES.indexOf(propertyKey) !== -1) {
                    return true;
                }
                sanetizedProperties[propertyKey] = entityProperties[propertyKey];
            });

            // Allow for non-entity parent objects, this allows us to offset groups of entities to a specific position/rotation
            var parentProperties = sanetizedProperties;
            if (entityProperties.type !== undefined) {
                parentProperties = createEntity(sanetizedProperties, parent, overrideProperties);
            }
            if (entityProperties.childEntities !== undefined) {
                parentProperties.childEntities =
                    createEntitiesFromTree(entityProperties.childEntities, parentProperties, overrideProperties);
            }
            createdTree.push(parentProperties);
        });
        return createdTree;
    };

    function spawnEntity(entityID) {
        var properties = Entities.getEntityProperties(entityID, ['userData', 'position']);
        if (triggerSound !== null && triggerSound.downloaded) {
            Audio.playSound(triggerSound, {
                position: properties.position,
                volume: 0.5
            });
        }
        if (properties.userData !== lastUserData) {
            lastUserData = properties.userData;

            try {
                parsedUserData = JSON.parse(lastUserData);
            } catch (e) {
                print('Failed to parse userdata for entitySpawner: ' + entityID);
                return;
            }
            rezEntityTree = importEntitiesJSON(parsedUserData.importJSON, {
                position: parsedUserData.position
            }, {
                lifetime: 1800
            });
        }
         
        if (rezEntityTree === null) {
            return;
        }

        // Calculate possible rez-position



        var createdEntities = createEntitiesFromTree([rezEntityTree]);
        var createdEntityID = createdEntities[0].childEntities[0].id;
        print('Created an entity with ID ' + createdEntityID);
    }

    this.preload = function(entityID) {
        triggerSound = SoundCache.getSound(TRIGGER_SOUND_URL);
    };

    this.startFarTrigger = function(entityID, args) {
        spawnEntity(entityID);
    };

    this.clickReleaseOnEntity = function(entityID, mouseEvent) {
        if (!mouseEvent.isLeftButton) {
            return;
        }
        spawnEntity(entityID);
    };
 })();
