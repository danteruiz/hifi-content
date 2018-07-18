var entityScript = (function () {
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.collisionWithEntity = function (myID, otherID, collision) {
        Entities.editEntity(myID, {
            color: {
                red: randomInteger(128, 255),
                green: randomInteger(128, 255),
                blue: randomInteger(128, 255)
            }
        });
    };
});

var entityID = Entities.addEntity({
    type: "Box",
    position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(MyAvatar.orientation, { x: 0, y: 0, z: -5 })),
    dimensions: { x: 0.5, y: 0.5, z: 0.5 },
    color: { red: 128, green: 128, blue: 128 },
    gravity: { x: 0, y: -9.8, z: 0 },
    velocity: { x: 0, y: 0.1, z: 0 },  // Kick off physics.
    dynamic: true,
    collisionless: false,  // So that collision events are generated.
    script: "(" + entityScript + ")",  // Could host the script on a Web server instead.
    lifetime: 300  // Delete after 5 minutes.
});
