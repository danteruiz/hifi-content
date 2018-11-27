(function() {
    var interactiveWindow = Desktop.createWindow(Script.resolvePath("./qml/testButton.qml"), {
        presentationMode: Desktop.PresentationMode.NATIVE
    });

    interactiveWindow.size = { x: 500, y: 500 };

    Script.scriptEnding.connect(function() {
        interactiveWindow.close();
    });
}());
