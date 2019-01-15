import QtQuick 2.0

Rectangle {
    width: parent.width
    height: parent.hight

    color: "blue"

    MultiPointTouchArea {
        anchors.fill: parent
        mouseEnabled: true

        onCanceled: {
            console.log("onCanceled");
        }

        onPressed: {
            console.log("onPressed");
        }

        onReleased: {
            console.log("onReleased");
        }

        onTouchUpdated: {
            console.log("onTouchUpdated");
        }

        onUpdated: {
            console.log("onUpdated");
        }
    }
}
