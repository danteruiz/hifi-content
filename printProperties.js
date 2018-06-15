"use strict";

(function() {

    function update() {
        var tabletProperties = Overlays.getProperty(HMD.tabletID, "localPosition");
        print("tabelt localPosition: " + JSON.stringify(tabletProperties));
    }

    Script.update.connect(update);
})();
