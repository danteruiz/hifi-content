var circle3d = null;

var TARGET_UPDATE_HZ = 60; // 50hz good enough, but we're using update
var BASIC_TIMER_INTERVAL_MS = 1000 / TARGET_UPDATE_HZ;
var lastInterval = 0;
var intervalCount = 0;
var totalDelta = 0;
var totalVariance = 0;
var start = false;
var startTime = 0;
var finished = false;
var finalTime = 0;
var w = 0;

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function updateTimings() {
    intervalCount++;
    var thisInterval = Date.now();
    if (!start) {
        startTime = thisInterval;
        start = true;
    }

    var endDelta = thisInterval - startTime;
    var milis = Math.floor(endDelta / 1000);
    if (endDelta >= 4000 && !finished) {
        finished = true;
        finalTime = endDelta;
        print("finalTime: " + finalTime);
    } else if (!finished){
        finalTime = endDelta;
    }
    var deltaTimeMsec = thisInterval - lastInterval;
    var deltaTime = deltaTimeMsec / 1000;
    lastInterval = thisInterval;
    totalDelta += deltaTimeMsec;
    var variance = Math.abs(deltaTimeMsec - BASIC_TIMER_INTERVAL_MS);
    totalVariance += variance;

    return deltaTime;
}

function putOverlayAcrossFromAvatar(avatar) {
    var avatarRot = Quat.fromPitchYawRollDegrees(0, avatar.bodyYaw, 0.0);
    var position = Vec3.sum(avatar.position, Vec3.multiply(1.5, Quat.getFront(avatarRot)));
    return position;
}

var totalTime = 0;
function update() {
    var deltaTime = updateTimings();
    totalTime += deltaTime;
    var PI = 3.1415;
    var TWO_PI = Math.PI * 2;
    var frequency = (finalTime / 4000);
    var newW = (TWO_PI * frequency);
    var t = newW * 57.3; //precisionRound(newW, 1);
    w =  t;
    var newProps = {
        endAt: w
    };

    print(t);
    print("finalTime: " + finalTime);
    Overlays.editOverlay(circle3d, newProps);
    Script.setTimeout(update, BASIC_TIMER_INTERVAL_MS);
}

var properties = {
    position: putOverlayAcrossFromAvatar(MyAvatar),
    solid: true,
    innerRadius: 0.0,
    outerRadius: 0.3,
    startAt: 0,
    endAt: w,
    outerColor: {red:0, green: 100, blue: 0},
    innerColor: {red: 0, green: 150, blue: 0},
    alpha: 1.0,
    innerAlpha: 0.9,
    Alpha: 1.0
};

circle3d = Overlays.addOverlay("circle3d", properties);

function cleanup() {
    Overlays.deleteOverlay(circle3d);
    totalTime = 0;
    var totalDelta = 0;
}
Script.setTimeout(update, BASIC_TIMER_INTERVAL_MS);
Script.scriptEnding.connect(cleanup);
