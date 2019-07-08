import QtQuick 2.0

Rectangle {
    id: root

    anchors.fill: parent;
    color: Qt.rgba(0,0,0,1.0);


    MouseArea {
        anchors.fill: parent
        hoverEnabled: true

        onPositionChanged: {
            console.log(mouse.x);
            console.log(mouse.y);
            root.color = Qt.rgba((mouse.x / root.width), 0.5, (mouse.y / root.height), 1.0);
        }
    }
}
