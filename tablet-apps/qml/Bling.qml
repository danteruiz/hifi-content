import QtQuick 2.10
import QtGraphicalEffects 1.0

Rectangle {
    id: root

    width: parent.width
    height: parent.height
    color: "#021C1E"


    signal sendToScript(var message);

    function fromScript(message) {
        if (message.hasOwnProperty("bling")) {
            var action = message.action;

            if (action === "updateList") {
                updateSkinListData(message.data.skins);
            }
        }
    }

    function updateSkinListData(skinsObject) {
        skinView.clearSkinList();
        var skinKeys = Object.keys(skinsObject);
        for (var keyIndex = 0; keyIndex < skinKeys.length; keyIndex++) {
            var skinName = skinKeys[keyIndex];
            var skinData = skinsObject[skinName];
            skinView.addSkin(skinName, skinData);
        }
    }

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

        property int activeSkinIndex: -1

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
                property bool isActive: active
                color: defaultColor
                border.color: mouseArea.containsMouse ? Qt.darker(color) : Qt.lighter(color)

                Text {
                    anchors.centerIn: parent
                    font.pointSize: 24
                    text: skinName
                    color: "white"
                }

                Rectangle {
                    width: 20
                    height: 20
                    radius: 10
                    visible: isActive
                    color: "#6FB98F"

                    anchors {
                        left: parent.left
                        leftMargin: parent.width * 0.07
                        verticalCenter: parent.verticalCenter
                    }
                }

                MouseArea {
                    id: mouseArea
                    anchors.fill: parent
                    hoverEnabled: true

                    onClicked: {
                        if (editArea.inEditArea()) {

                        } else {
                            var message = {
                                bling: true
                            };
                            if (skinView.activeSkinIndex === index && isActive) {
                                // disable tablet skin
                                message.action = "clearActiveSkin";
                                skinList.setProperty(index, "active", !isActive);
                                skinView.activeSkinIndex = -1;
                            } else {
                                skinList.setProperty(skinView.activeSkinIndex, "active", false);
                                skinList.setProperty(index, "active", !isActive);

                                if (isActive) {
                                    message.action = "applySkin";
                                    message.data = skinData;
                                    skinView.activeSkinIndex = index;
                                }
                            }

                            root.sendToScript(message);
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


        function clearSkinList() {
            skinList.clear();
        }

        function addSkin(skin, data) {
            skinList.append({
                "skinName": skin,
                "skinData": data,
                "active": false
            });
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
        var message  = {
            bling: true,
            action: "initialize",
        };

        root.sendToScript(message);
        console.log("sending to root");
    }
}
