import QtQuick 2.10
import QtGraphicalEffects 1.0

Rectangle {
    id: root

    width: parent.width
    height: parent.height
    color: "#021C1E"

    Rectangle {
        id: header
        z: 3
        color: "#021C1E"
        width: parent.width
        height: 110
        Text {
            id: textHeader
            z: 1
            anchors.centerIn: header

            font.pointSize: 24
            color: "white"
            text: "Bling"
        }
    }

    ListView {
        id: skinView
        z: 0
        width: root.width
        height: root.height * 0.75
        anchors {
            horizontalCenter: header.horizontalCenter
            top: header.bottom
        }

        ListModel {
            id: skinList
        }

        Component {
            id: listDelegate

            Rectangle {
                id: listItem
                width: root.width
                height: 90
                radius: 3
                property color defaultColor: index % 2 == 0 ? "#004445" : "#2C7873"
                property color highlightColor: Qt.lighter(defaultColor)
                color: defaultColor
                border.color: mouseArea.containsMouse ? Qt.darker(color) : Qt.lighter(color)

                Text {
                    anchors.centerIn: parent
                    font.pointSize: 24
                    text: skinName
                    color: "white"
                }

                MouseArea {
                    id: mouseArea
                    anchors.fill: parent
                    hoverEnabled: true

                    onClicked: {
                        if (editArea.inEditArea()) {
                            console.log("------> edit skin: " + skinName + " <-----");
                        } else {
                            console.log("------> enabled skin: " + skinName + " <-----");
                        }
                    }
                }

                Rectangle {
                    id: editArea
                    width: 0.0
                    radius: 3

                    NumberAnimation on width {
                        running: mouseArea.containsMouse
                        from: 0.0
                        to: parent.width * 0.15
                    }

                    NumberAnimation on width {
                        running: !mouseArea.containsMouse && editArea.width > 0.0
                        from: editArea.width
                        to: 0.0
                    }
                    anchors {
                        right: parent.right
                        rightMargin: 1.0
                        top: parent.top
                        topMargin: 1.0
                        bottom: parent.bottom
                        bottomMargin: 1.0
                    }

                    property color defaultColor: "#6FB98F"
                    property color highlightColor: Qt.lighter(defaultColor);
                    color: inEditArea() ? highlightColor : defaultColor

                    Image {
                        width: 30
                        height: 30
                        anchors.centerIn: parent
                        source: "../images/screwdriver-and-wrench-crossed.svg"
                        visible: mouseArea.containsMouse
                    }

                    function inEditArea() {
                        if (mouseArea.containsMouse) {
                            return editArea.contains(editArea.mapFromItem(listItem, mouseArea.mouseX, mouseArea.mouseY));
                        }
                        return false;
                    }
                }
            }
        }

        model: skinList
        delegate: listDelegate

        function addSkin(skin) {
            skinList.append({"skinName": skin});
        }
    }

    Rectangle {
        id: footer
        radius: 3
        anchors {
            left: parent.left
            right: parent.right
            bottom: parent.bottom
            top: skinView.bottom
            topMargin: 3
        }

        property color defaultColor: "#021C1E"
        property color hoverColor: Qt.lighter(defaultColor);
        color: mouseArea.containsMouse ? hoverColor : defaultColor
        border.color: Qt.lighter(defaultColor)

        Image {
            width: 40
            height: 40
            anchors.centerIn: parent
            source: "../images/add-green.svg"
        }

        MouseArea {
            id: mouseArea
            anchors.fill: parent
            hoverEnabled: true

            onClicked: {
                console.log("-----> clicked <-----");
            }
        }
    }

    Component.onCompleted: {
        for (var index = 0; index < 10; index++) {
            skinView.addSkin(index);
        }
    }
}
