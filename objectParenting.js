
(function() {
    var FIVE_KEY = 53;
    var SIX_KEY = 54;
    var SEVEN_KEY = 55;
    var EIGHT_KEY = 56;

    var instructionsOverlay = null;
    var overlay1 = null;
    var overlay2 = null;
    var entity1 = null;
    var entity2 = null;

    var instructionText = "H";

    instructionsOverlay = Overlays.addOverlay("text", {
        text: instructionText,
        x: 0,
        y: 0,
        width: 500,
        height: 100
    });

    function cleanup() {
        Overlays.deleteOverlay(instructionsOverlay);
        Overlays.deleteOverlay(overlay1);
        Overlays.deleteOverlay(overlay2);
        Entities.deleteEntity(entity1);
        Entities.deleteEntity(entity2);
    }

    function parentEntityAvatar() {
    }

    function parentEntityOverlay() {
    }

    function parentAvatarEntity() {
    }

    function parentAvatarEntityOverlay() {
    }

    function keyPressEvent(event) {
        print(JSON.stringify(event));
    }

    Controller.keyPressEvent.connect(keyPressEvent);

    Script.scriptEnding.connect(cleanup);
})();
