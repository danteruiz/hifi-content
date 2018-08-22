// Copyright 2018, High Fidelity Inc. 
//
// Licensed under the Apache 2.0 License
//
/* globals MyAvatar, Entities */
(function () { 
    var danceAnimationURL;
    var danceAnimationFrames;
    var danceAnimationFPS;

    var DanceCube = function(){

    };

    function onClick() {

    }

    DanceCube.prototype = {
        preload: function(entityID) {
            var userData = JSON.parse(Entities.getEntityProperties(entityID, 'userData').userData);
            danceAnimationURL = userData.danceAnimationURL;
            danceAnimationFrames = userData.danceAnimationFrames;
            danceAnimationFPS = userData.danceAnimationFPS;
        },
        clickDownOnEntity: function () { 
            this.onClick();
        },
        stopNearTrigger: function() {
            this.onClick();
        },
        stopFarTrigger: function() {
            print("triggered entitiy");
            this.onClick();
        },
        onClick: function() {
            this.a = !this.a; 
            if (this.a & !MyAvatar.isFlying()) {
                MyAvatar.overrideAnimation(danceAnimationURL, danceAnimationFPS, true, 0, danceAnimationFrames);
            } else {
                MyAvatar.restoreAnimation(); 
            }
        }
    };

    return new DanceCube();
});
