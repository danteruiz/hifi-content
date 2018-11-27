import controlsUit 1.0
import QtQuick 2.7

Rectangle {
    id: root
    width: parent.width
    height: parent.height

    color: "black"
    property  bool alternate: false
    Button {
        anchors.centerIn: parent

        onClicked: {
            alternate = !alternate;
            root.color = alternate ? "blue" : "green";
        }
    }
}
