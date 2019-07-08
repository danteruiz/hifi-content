import QtQuick 2.0
import QtQuick.Controls 1.4
import stylesUit 1.0
import controlsUit 1.0 as Controls

Rectangle {
    id: root

    HifiConstants { id: hifi }
    anchors.fill: parent
    color: hifi.colors.baseGray

    property var dockSelected: false
    property var dockMode: "LEFT"
    property var displayMode: "NATIVE"

    function fromScript(message) {
        console.log(message);
    }

    signal sendToScript(var message);

    RalewayRegular {
        id: presentation

        anchors {
            top: parent.top
            topMargin: parent.height * 0.01
            left: parent.left
            leftMargin: parent.width * 0.01
        }

        size: 18
        color: hifi.colors.white
        text: "Presentation Mode: "
    }

    Row {
        id: row
        anchors {
            top: presentation.top
            left: presentation.right
            leftMargin: 1
            horizontalCenter: presentation.verticalCenter
        }

        Controls.RadioButton {
            text: "Virtual"
            fontSize: 12
            boxSize: 12

            onClicked: {
                root.dockSelected = false;
                column.state = "";
                root.displayMode = "VIRTUAL"
            }
        }

        Controls.RadioButton {
            text: "Native"
            fontSize: 12
            boxSize: 12
            checked: true
            onClicked: {
                root.dockSelected = false;
                column.state = "";
                root.displayMode = "NATIVE";
            }
        }

        Controls.RadioButton {
            text: "Docked"
            fontSize: 12
            boxSize: 12

            onClicked: {
                root.dockSelected = true;
                column.state = "docked";
                root.displayMode = "NATIVE";
            }
        }
    }

    RalewayRegular {
        id: dockedArea
        text: "Dock Area:"
        visible: root.dockSelected
        size: 18
        color: hifi.colors.white

        anchors {
            top: presentation.bottom
            topMargin: 3
            left: parent.left
            leftMargin: parent.width * 0.01
        }
    }

    Row {
        id: dockedSelection
        anchors {
            top: dockedArea.top
            left: dockedArea.right
            leftMargin: 1
            horizontalCenter: dockedArea.verticalCenter
        }

        visible: root.dockSelected

        Controls.RadioButton {
            text: "Top"
            fontSize: 12
            boxSize: 12

            onClicked: {
                root.dockMode = "TOP";
            }
        }

        Controls.RadioButton {
            text: "Bottom"
            fontSize: 12
            boxSize: 12
            onClicked: {
                root.dockMode = "BOTTOM";
            }
        }

        Controls.RadioButton {
            text: "Left"
            fontSize: 12
            boxSize: 12
            checked: true
            onClicked: {
                root.dockMode = "LEFT";
            }
        }

        Controls.RadioButton {
            text: "Right"
            fontSize: 12
            boxSize: 12
            onClicked: {
                root.dockMode = "RIGHT";
            }
        }
    }

    Column {
        id: column
        spacing: 5

        anchors {
            top: presentation.bottom
            topMargin: 3
            left: root.left
            leftMargin: root.width * 0.01
        }

        states: State {
            name: "docked"
            AnchorChanges {
                target: column
                anchors.top: dockedArea.bottom
            }
        }

        Row {
            id: sizeProps
            spacing: 25
            RalewayRegular {
                id: sizeText
                text: "Size:"
                size: 18
                color: hifi.colors.white
            }

            Controls.SpinBox {
                id: sizeX
                width: 120
                height: 20
                z: 10

                maximumValue: 1080
                realValue: 200
                labelInside: "x: "
            }

            Controls.SpinBox {
                id: sizeY
                width: 120
                height: 20
                z: 10
                maximumValue: 1080
                realValue: 100
                labelInside: "y: "
            }
        }


        Row {
            id: positionProps
            spacing: 25
            RalewayRegular {
                text: "Position: "
                size: 18
                color: hifi.colors.white
            }

            Controls.SpinBox {
                id: positionX
                width: 120
                height: 20
                z: 10

                maximumValue: 1080
                realValue: 100
                labelInside: "x: "
            }

            Controls.SpinBox {
                id: positionY
                width: 120
                height: 20
                z: 10

                maximumValue: 1080
                realValue: 100
                labelInside: "y: "
            }
        }
    }

    Controls.Button {
        id: create
        text: "Create Window"

        width: 200
        height: 35
        states: [
            State {
                name: "create"
                PropertyChanges {
                    target: create
                    text: "Create Interactive Window"
                }
            },
            State {
                name: "recreate"
                PropertyChanges {
                    target: create
                    text: "Re-Create Interactive Window"
                }
            },
            State {
                name: "update"
                PropertyChanges {
                    target: create
                    text: "Update Interactive Window"
                }
            }
        ]
        anchors {
            top: column.bottom
            topMargin: 25
            left: root.left
            leftMargin: root.width * 0.01
        }


        onClicked: {
            var properties = {};


            properties.presentationMode = root.displayMode;
            if (dockSelected) {
                properties.presentationWindowInfo = {
                    "dockedArea": root.dockMode
                }
            }
            properties.size = {
                x: sizeX.realValue,
                y: sizeY.realValue
            };

            properties.position = {
                x: positionX.realValue,
                y: positionY.realValue
            };


            properties.title = "Test window"


            sendToScript(JSON.stringify({
                "create": properties}));
        }
    }


    Controls.Button {
        id: crashButton

        text: "Crash Test"
        width: 200
        height: 35

        anchors {
            top: column.bottom
            topMargin: 25
            left: create.right
            leftMargin: 15
        }

        onClicked: {
            var propertiess = {};
        }
    }


    Controls.Button {
        id: closeButton
        text: "Close window"
        width : 200
        height: 35

        anchors {
            top: create.bottom
            topMargin: 25
            left: root.left
            leftMargin: root.width * 0.01
        }

        onClicked: {
            console.log("close window");

             sendToScript("close");
        }
    }
}
