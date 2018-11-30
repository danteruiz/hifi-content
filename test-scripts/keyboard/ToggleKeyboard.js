// toggleKeyboard.js
(function() {
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    var buttonProperties = {
        text: "TT"
    };

    var raised = Keyboard.raised;
    var button = tablet.addButton(buttonProperties);
    button.clicked.connect(onClicked);

    function onClicked() {
        raised = !raised;
        Keyboard.raised = raised;
        button.editProperties({
            isActive: raised
        });
    }

    Script.scriptEnding.connect(function() {
        if (button) {
            button.clicked.disconnect(onClicked);
        }
        tablet.removeButton(button);
    });
}());
