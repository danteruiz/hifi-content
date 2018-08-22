var avatarOne =  "http://mpassets.highfidelity.com/b7c412a8-5278-4778-b62e-a1dafee6c5f4-v1/Robimo_black[1].fst?1";
var avatarTwo = "http://mpassets.highfidelity.com/e1d3f80f-4b7a-4ab6-8dca-594058208bbc-v1/Robimo_white[1].fst";
var running = false;
var time = 200;
var secondaryCamera = Render.getConfig("SecondaryCamera");
var overlay = null;
var properties = {
    name: "overlaySphere",
    type: "cube",
    dimensions: {x: 0.2, y: 0.2, z: 0.2},
    visible: true
};

if (!overlay) {
    overlay = Overlays.addOverlay("cube", properties);
}
function changeAvatar() {
    /*if (MyAvatar.skeletonModelURL === avatarOne) {
        MyAvatar.skeletonModelURL = avatarTwo;
    } else {
        MyAvatar.skeletonModelURL = avatarOne;
    }
    if (running) {
        Script.setTimeout(changeAvatar, 20);
        }*/

    Window.takeMugShot();
}


function keyPressEvent(event) {
    print(event.key);
    if (event.key === 86) {
        secondaryCamera.enableSecondaryCameraRenderConfigs(true);
        var sensorToWorldScale = MyAvatar.sensorToWorldScale;
        var headPos = MyAvatar.getHeadPosition();
        print(JSON.stringify(headPos));
        var headRot = Quat.cancelOutRollAndPitch(MyAvatar.headOrientation);
        print(JSON.stringify(headRot));
        var right = Quat.getRight(headRot);
        var forward = Quat.getForward(headRot);
        var up = Quat.getUp(headRot);

        var FORWARD_OFFSET = 1.5 * sensorToWorldScale;
        var UP_OFFSET = -0.16 * sensorToWorldScale;
        var forwardPosition = Vec3.sum(headPos, Vec3.multiply(FORWARD_OFFSET, forward));
        secondaryCamera.position = forwardPosition;
        var MY_EYES = { x: 0.0, y: 0.15, z: 0.0 };
        var rot = Quat.lookAt(forwardPosition, headPos, Vec3.multiplyQbyV(MyAvatar.orientation, Vec3.UNIT_Y));
        secondaryCamera.orientation = rot;
        var overlayProperties = {
            position: secondaryCamera.position
        };

        Overlays.editOverlay(overlay, overlayProperties);
        //print(JSON.stringify(secondaryCamera.position));
        Script.setTimeout(function() {
            changeAvatar();
            secondaryCamera.enableSecondaryCameraRenderConfigs(false);
        }, 700); 
    }
}

Controller.keyPressEvent.connect(keyPressEvent);

function cleanup() {
    Overlays.deleteOverlay(overlay);
    overlay = null;
}

Script.scriptEnding.connect(cleanup);
