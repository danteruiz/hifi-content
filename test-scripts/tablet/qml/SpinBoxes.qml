import QtQuick 2.0
import ControlsUit 1.0 as HifiControls
import stylesUit 1.0


Item {
    id: root

    anchors.fill: parent

    HifiConstants { id: hifi }
    Rectangle {
        id: darkSpinners
        width: parent.width
        height: parent.height / 2

        color: hifi.colors.faintGray

        anchors.top: parent.top

        HifiControls.SpinBox {
            id: spinBox1
            z: 10
            width: 100
            height: 40
            label: "First Spinner - step: 12.7, min: -100, max: 500, decimals: 6"
            suffix: " cm"
            minimumValue: -100
            maximumValue: 500
            realStepSize: 12.7
            realValue: -0
            decimals: 6

            colorScheme: hifi.colorSchemes.dark
            anchors {
                verticalCenter: parent.verticalCenter
                left: parent.left
                leftMargin: 15
            }

            onEditingFinished: {
                firstSpinnerValue.text = realValue;
            }
        }

        HifiControls.Label {
            id: firstSpinnerValue


            enabled: spinBox1.focus
            width: 50
            height: 50
            anchors {
                verticalCenter: spinBox1.verticalCenter
                left: spinBox1.right
                leftMargin: 15
            }

            text: "0"

            colorScheme: hifi.colorSchemes.dark
        }

        MouseArea {
            id: mouseArea
            anchors.fill: parent
        }
    }


    Rectangle {
        id: lightSpinners

        width: parent.width
        height: parent.height / 2

        color: hifi.colors.darkGray

        anchors.top: darkSpinner.bottom
        anchors.bottom: parent.bottom




        HifiControls.SpinBox {
            id: spinBox2
            z: 10
            width: 100
            height: 40
            label: "Second Spinner - step: 1.5, min: -10, max: 10, decimals: 1"
            suffix: " Feet"
            minimumValue: -10
            maximumValue: 10
            realStepSize: 1.5
            realValue: -5
            decimals: 1

            colorScheme: hifi.colorSchemes.light

            anchors {
                verticalCenter: parent.verticalCenter
                left: parent.left
                leftMargin: 15
            }

            onEditingFinished: {
                secondSpinnerValue.text = realValue;
            }
        }



        HifiControls.Label {
            id: secondSpinnerValue


            enabled: spinBox2.focus
            width: 50
            height: 50
            anchors {
                verticalCenter: spinBox2.verticalCenter
                left: spinBox2.right
                leftMargin: 15
            }

            text: "-5"
            colorScheme: hifi.colorSchemes.light
        }

        MouseArea {
            id: mouseAreaLight
            anchors.fill: parent
        }
    }
}
