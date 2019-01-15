import QtQuick 2.0

Rectangle {
    id: root
    anchors.fill: parent
    color: Qt.rgba(Math.random(),Math.random(),Math.random(),1);

    Timer {
        interval: 500
        repeat: true
        running: true
        onTriggered: {
            console.log("onTriggered");
            root.color = Qt.rgba(Math.random(),Math.random(),Math.random(),1);
        }
    }
}
