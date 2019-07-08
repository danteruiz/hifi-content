(function() {
    var WINDOW_QML_SOURCE = Script.resolvePath("./qml/window.qml");
    var TEST_QML_SOURCE = Script.resolvePath("./qml/randomColor.qml");
    var window = Desktop.createWindow(WINDOW_QML_SOURCE, {
        title: "Interactive window test",
        presentationMode: Desktop.PresentationMode.NATIVE,
        size: {
            x: 700,
            y: 500
        }
    });

    var testWindow = null;

    window.fromQml.connect(function(message) {
        print(message);

        if (message === "close") {
            if (testWindow) {
                testWindow.close();
                testWindow = null;
            }

        } else {

            var data = JSON.parse(message);

            if (data.hasOwnProperty('create')) {
                if (testWindow) {
                    testWindow.close();
                    testWindow = null;
                }

                var props = data.create;
                var presentationModes = Desktop.PresentationMode;
                var dockAreas = Desktop.DockArea;
                print(JSON.stringify(presentationModes));
                props.presentationMode = presentationModes[props.presentationMode];
                if (props.hasOwnProperty('presentationWindowInfo')) {
                    print(props.presentationWindowInfo.dockedArea);
                    var dockedInfo = {
                        dockArea: dockAreas[props.presentationWindowInfo.dockedArea]
                    };

                    print(JSON.stringify(dockedInfo));

                    props.presentationWindowInfo = dockedInfo;
                }
                testWindow = Desktop.createWindow(TEST_QML_SOURCE, props);
            }
        }
    });

    Script.scriptEnding.connect(function() {
        window.close();
        window = null;
    });
}());
