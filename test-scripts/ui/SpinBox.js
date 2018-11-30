(function() {
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var buttonProperties = {
        text: "SpinBox"
    };

    var button = tablet.addButton(buttonProperties);
    function onClicked() {
        tablet.loadQMLSource(Script.resolvePath("../tablet/qml/SpinBoxes.qml"));
    }


    button.clicked.connect(onClicked);

    Script.scriptEnding.connect(function() {
        tablet.removeButton(button);
    });
}());
