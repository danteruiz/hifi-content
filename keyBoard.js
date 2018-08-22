//
//  pianoKey.js
//
//  created by Alexia Mandeville on 05/25/18
//  Copyright 2018 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

(function() { 
    var _this;
    var CHANNEL = 'HIFI_KEYBOARD_INPUT';
    var AUDIO_VOLUME_LEVEL = 0.9;
    var WHITE_KEY_LOCAL_Y_POSITION_UP = 0.0193;
    var WHITE_KEY_LOCAL_Y_POSITION_DOWN = 0.0083;
    var BLACK_KEY_LOCAL_Y_POSITION_UP = 0.0360;
    var BLACK_KEY_LOCAL_Y_POSITION_DOWN = 0.0230;
    var AUDIO_VOLUME = 1;
    var BLACK = { blue: 17, green: 17, red: 23 };
	var COLOR_PRESSED = { blue: 46, green: 40, red: 40 };
    var KEY_INDEX = 10;
    var COLOR_CHANGE_TIMEOUT = 250;
    var NEGATIVE = -1;
	var CHAR = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	
	var myString = "";
    var white = true;
    var playing = false;
    var sound;
    var Key = function() {
        _this = this;
    };

    Key.prototype = {
        preload: function(entityID){
            _this.entityID = entityID;
            var soundFile = "http://hifi-content.s3.amazonaws.com/alexia/Keyboard/keyboard_key.wav";
            sound = SoundCache.getSound(Script.resolvePath(soundFile));
            _this.setKeycolor();
            _this.firstPress = false;
            _this.timeExpired = false;

        },
        setKeycolor: function() {
            var colorObject = Entities.getEntityProperties(_this.entityID, 'color').color;
            if (JSON.stringify(colorObject).indexOf("0") !== NEGATIVE) {
                white = false;
            }
        },
        collisionWithEntity: function(thisEntity, otherEntity, collision) {
            if (collision.type !== 2 && collision.penetration.y >= 0.005) {
                // Continuation of the collision
                if (!_this.firstPress) {
                    this.playSound();
                    this.playHaptics();
                    this.amendString();
                    _this.firstPress = true;
                    Script.setTimeout(function() {
                        _this.timeExpired = true;
                    }, 500);
                } else if (_this.firstPress && _this.timeExpired) {
                    this.playSound();
                    this.playHaptics();
                    this.amendString();
                }
                // Need to amend string here continuously, after one second once the initial amend on collision enter has occurred.
            }
            if (collision.type === 2) { // On end of collision
                this.resetKey();
            }
        },
		amendString: function() {
            var string;
            if (_this.getKeyNumber() === "27") {
                string = "delete";
            } else if (_this.getKeyNumber() === "28") {
                string = ' ';
            } else {
                string= CHAR[_this.getKeyNumber() - 1];
            }
            var message = {
                key: string
            };

            Messages.sendMessage(CHANNEL, JSON.stringify(message));

			print(myString);
		},
        playHaptics: function() {
			Controller.triggerHapticPulse(1, 1, 1);
            Controller.triggerHapticPulse(1, 1, 0);
		},
        playSound: function() {
            _this.homePosition = Entities.getEntityProperties(_this.entityID, ["position"]).position;
            _this.injector = Audio.playSound(_this.sound, {position: _this.homePos, volume: AUDIO_VOLUME});
            if (sound.downloaded) {
                var position = Entities.getEntityProperties(_this.entityID, 'localPosition').localPosition;
                if (white) { 
                    position.y = WHITE_KEY_LOCAL_Y_POSITION_DOWN;
                } else {
                    position.y = BLACK_KEY_LOCAL_Y_POSITION_DOWN;
                }
                Entities.editEntity(_this.entityID, {
                    localPosition: position,
                    color: COLOR_PRESSED
                });
                Audio.playSound(sound, {
                    position: _this.homePosition,
                    volume: AUDIO_VOLUME_LEVEL
                });
            }
        },
        resetKey: function() {
            var newColor;
            var position = Entities.getEntityProperties(_this.entityID, 'localPosition').localPosition;
            position.y = WHITE_KEY_LOCAL_Y_POSITION_UP;
            newColor = BLACK;
            Entities.editEntity(_this.entityID, {
                localPosition: position,
                color: newColor
            });
            _this.firstPress = false;
            _this.timeExpired = false;
            amended = false;
        },
        getKeyNumber: function(){
            var keyName = Entities.getEntityProperties(_this.entityID, 'name').name;
            print(keyName.substr(KEY_INDEX));
            return keyName.substr(KEY_INDEX);
        }
    };

    return new Key();
});
