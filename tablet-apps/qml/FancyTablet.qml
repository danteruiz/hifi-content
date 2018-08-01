// FancyTablet.qml

import QtQuick 2.0

Rectangle {
    id: fancyTablet
    anchors.fill: parent
    color: "White"

    signal sendToScript(var message);

    Text {
        id: header
        width: 20
        height: 30
        text: "Fancy Tablet"
        font.pointSize: 16
        color: "red"
        horizontalAlignment: Text.AlignHCenter

        anchors.horizontalCenter: fancyTablet.horizontalCenter
    }


    Component.onCompleted: {
        console.log("------> page loaded <-------");
        console.log(HMD.tabletID);

        var message = {
            fancyTablet: {
                type: "init"
            }
        }
        fancyTablet.sendToScript(message);
    }
    function fromScript(message) {
    }
}
