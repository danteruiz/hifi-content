import QtQuick 2.0
import QtGraphicalEffects 1.0
import stylesUit 1.0 as HifiStyles
import controlsUit 1.0 as HifiControls

Rectangle {
    signal sendToScript(var message);
    id: root
    anchors.fill: parent
    color: Qt.rgba(0,0,0,0);
    opacity: 1.0
    radius: 8

    HifiStyles.HifiConstants {
        id: hifi
    }

    Image {
        id: image
        anchors.fill: parent
        source: "backgroundBanner.png"
        opacity: 0.7
        smooth: false
    }

    HifiStyles.RalewayBold {
        z: 1
        id: placeName
        size: 52
        text: "The Spot"
        color: "#FFFFFF"
        font.weight: Font.ExtraBold

        anchors {
            horizontalCenter: root.horizontalCenter
            top: parent.top
            topMargin: root.height * 0.12
        }
    }


    HifiStyles.RalewayRegular {
        z: 1
        id: loadingInfo
        size: 18
        text: "Now Loading, please stand by."
        color: "#FFFFFF"
        anchors {
            horizontalCenter: placeName.horizontalCenter
            top: placeName.bottom
            topMargin: 54
        }
    }

    Rectangle {
        z: 1
        id: loader
        color: "white"
        width: 15
        height: 15
        radius: 20

        anchors {
            horizontalCenter: loadingInfo.horizontalCenter
            top: loadingInfo.bottom
            topMargin: 30
        }
    }


    HifiControls.Button {
        z: 1
        id: backButton
        width: 112
        height: 35

        text: "GO BACK"
        color: hifi.buttons.noneBorderlessWhite
        radius: 0

        anchors {
            left: root.left
            leftMargin: 60
            top: loader.bottom
            topMargin: 60
        }
    }

    HifiControls.Button {
        z: 1
        id: skipButton
        width: 181
        height: 35

        text: "TAKE ME THERE NOW"
        color: hifi.buttons.blue


        anchors {
            top: loader.bottom
            topMargin: 60
            right: root.right
            rightMargin: 60
        }
    }

    GaussianBlur {
        anchors.fill: image
        source: image
        radius: 50
        samples: 16
    }

    onWidthChanged: {
        console.log("width: " + root.width);
    }

    onHeightChanged: {
        console.log("height: " + root.height);
    }

    Component.onCompleted: {
        console.log("width: " + root.width);
        console.log("height: " + root.height);
    }
}
