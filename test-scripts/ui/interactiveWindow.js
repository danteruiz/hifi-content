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
    var testProps = null;
    var testCount = 0;

    function closeWindowIfOpen() {
        if (testWindow) {
            testWindow.close();
            testWindow = null;
        }
    }

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
                closeWindowIfOpen();

                var props = convertProperties(data.create);
                testWindow = Desktop.createWindow(TEST_QML_SOURCE, props);
            } else if (data.hasOwnProperty('test')) {
                closeWindowIfOpen();
                testProps = convertProperties(data.test);
                testWindow = Desktop.createWindow(TEST_QML_SOURCE, testProps);
                testCount = 0;
                Script.setTimeout(updateTest, 200);
            }
        }
    });

    function updateTest() {
        if (testCount < 50) {
            if (testWindow) {
                closeWindowIfOpen();
                print("closeWindow");
            } else {
                print("Creating window");
                print(JSON.stringify(testProps));
               testWindow = Desktop.createWindow(TEST_QML_SOURCE, testProps);
            }
            testCount++;
            Script.setTimeout(updateTest, 200);
        } else {
            closeWindowIfOpen();
        }
    }

    function convertProperties(properties) {
        var props = properties;
        var presentationModes = Desktop.PresentationMode;
        var dockAreas = Desktop.DockArea;
        props.presentationMode = presentationModes[props.presentationMode];
        if (props.hasOwnProperty('presentationWindowInfo')) {
            print(props.presentationWindowInfo.dockedArea);
            var dockedInfo = {
                dockArea: dockAreas[props.presentationWindowInfo.dockedArea]
            };

            print(JSON.stringify(dockedInfo));

            props.presentationWindowInfo = dockedInfo;
        }

        return props;
        testWindow = Desktop.createWindow(TEST_QML_SOURCE, props);
    }

    Script.scriptEnding.connect(function() {
        closeWindowIfOpen();
        window.close();
        window = null;
    });
}());
