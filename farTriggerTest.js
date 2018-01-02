(function() {
    var entity = null

    this.preload = function(entityID) {
        print(entityID);
        entity = entityID;
    };

    this.startFarTrigger = function() {
        print("-----> far trigger <------");
    };

    this.continueFarTrigger = function() {
        print("-----> continue far trigger <------");
    };

    this.stopFarTrigger = function() {
        print("-----> end far trigger <-----");
    };
});
