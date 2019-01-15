(function() {
    var button = null;
    var buttonName = "MTouch";
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    button = tablet.addButton({
        text: buttonName,
        sortOrder: 4
    });

    function onClicked() {
        tablet.loadQMLSource(Script.resolvePath("qml/MultiTouch.qml"));
    }

    button.clicked.connect(onClicked);


    Script.scriptEnding.connect(function () {
        button.clicked.disconnect(onClicked);
        tablet.removeButton(button);
    });
}());
