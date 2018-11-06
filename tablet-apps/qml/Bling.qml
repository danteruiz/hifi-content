import QtQuick 2.0

Rectangle {
    id: root

    width: parent.width
    height: parent.height

    color: "white"


    Text {
        id: textHeader
        anchors {
            horizontalCenter: root.horizontalCenter
        }

        font.pointSize: 24
        color: "black"
        text: "Bling"
    }

    ListView {
        id: skinView

        width: root.width * 0.90
        height: root.height * 0.70

        anchors {
            horizontalCenter: textHeader.horizontalCenter
            top: textHeader.bottom
            topMargin: 10
        }

        ListModel {
            id: skinList

            ListElement { skinName: "test" }
            ListElement { skinName: "test2" }
        }

        Component {
            id: listDelegate

            Rectangle {
                width: root.width * 0.90
                height: 90
                color: "blue"

                Text {
                    anchors.centerIn: parent
                    text: skinName
                }
            }
        }

        model: skinList
        delegate: listDelegate

        header: Component {
            Rectangle {
                width: root.width * 0.90
                height: 90
                color: "red"

                Text {
                    anchors.centerIn: parent
                    text: "Tablet Skins"
                    color: "white"
                }
            }
        }
    }
}
