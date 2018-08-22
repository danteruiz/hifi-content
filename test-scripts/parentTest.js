"use strict";

/* global Entities, MyAvatar, Vec3, Quat */

(function() {
    function Test() {
        return;
    }

    Test.prototype = {
        startNearGrab: function(entityID, args) {
            print("------------> testing <---------");
        }
    };
    return new Test();
}());
