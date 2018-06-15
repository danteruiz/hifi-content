(function() {
    function update() {
        print("NearbyEntitiesReadyCount: " + Window.getPhysicsNearbyEntitiesReadyCount());
        print("NearbyEntitiesStabilityCount: " + Window.getPhysicsNearbyEntitiesStabilityCount());
        print("NearbyEntitiesCount: " + Window.getPhysicsNearbyEntitiesCount());
        Script.setTimeout(update, 16);
    }


    Script.setTimeout(update, 16);
})();
