
(function() {
    var CHANNEL = 'HIFI_KEYBOARD_INPUT';
    var _this;
    var text = '';
    var KeyboardInput = function() {
        _this = this;
    };

    KeyboardInput.prototype = {
        preload: function(entityID){
            _this.entityID = entityID;
            Entities.editEntity(entityID, {text: text});
        },
        receiveMessage: function(channel, message, senderID, localOnly) {
            try {
                var data = JSON.parse(message);
                if (channel === CHANNEL) {
                    var key = data.key;
                    if (key === "delete") {
                        text = text.substring(0, text.length - 1);
                    } else {
                        text += key;
                    }
                    print(text);
                    Entities.editEntity(_this.entityID, {text: text});
                }
            } catch (error) {
            }
        }
    };
    var keyboardInput = new KeyboardInput();

    Messages.subscribe(CHANNEL);
    Messages.messageReceived.connect(keyboardInput.receiveMessage);
    return keyboardInput;
});
