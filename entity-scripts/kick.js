(function () {
    var clicked = false;
    this.clickDownOnEntity = function (entityID, mouseEvent) {
        var avatars =  AvatarList.getAvatarIdentifiers();
        Users.kick(avatars[Math.floor(Math.random()*avatars.length)]);
    };
});
