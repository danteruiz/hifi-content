// testWindow.js
var window = new OverlayWindow({title: 'Test Window', width: 300, height: 300});
window.closed.connect(function () { print("window closed signal received"); });
Window.visibleChanged.connect(function() {
    var visible = window.visible;
    print("visibility changed: " + visible);
    if (!visible) {
        print("----> setting visible to true <-----");
        window.visible = !visible;
    }
});
