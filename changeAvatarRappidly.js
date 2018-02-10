var avatarOne =  "http://mpassets.highfidelity.com/b7c412a8-5278-4778-b62e-a1dafee6c5f4-v1/Robimo_black[1].fst?1";
var avatarTwo = "http://mpassets.highfidelity.com/e1d3f80f-4b7a-4ab6-8dca-594058208bbc-v1/Robimo_white[1].fst";
var running = false;
var time = 200;
function changeAvatar() {
    if (MyAvatar.skeletonModelURL === avatarOne) {
        MyAvatar.skeletonModelURL = avatarTwo;
    } else {
        MyAvatar.skeletonModelURL = avatarOne;
    }
    if (running) {
        Script.setTimeout(changeAvatar, 20);
    }
}


function keyPressEvent(event) {
    if (event.key === 80) {
        running = !running;
        if (running) {
            Script.setTimeout(changeAvatar, 200);
        }
    }
}

Controller.keyPressEvent.connect(keyPressEvent);
