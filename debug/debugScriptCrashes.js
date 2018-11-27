(function() {
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var buttonProperties = {
        text: "RelaodAll"
    };
    var button = tablet.addButton(buttonProperties);

    function clicked() {
        ScriptDiscoveryService.reloadAllScripts();
    }

    button.clicked.connect(clicked);

    Script.scriptEnding.connect(function() {
        tablet.removeButton(button);
        print("---------> ending script <---------");
    });
}());
