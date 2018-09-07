// sessionUUIDChanged.js

(function() {
    MyAvatar.sessionUUIDChanged.connect(function() {
        print("----------> session UUID changed: ");
        print(MyAvatar.sessionUUID);
    });
}());
