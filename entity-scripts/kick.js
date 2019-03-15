(function () {

    function kickRandomUser() {
        var avatars =  AvatarList.getAvatarIdentifiers();

        Users.kick(avatars[Math.floor(Math.random()*avatars.length)]);
    }

    Script.update.connect(kickRandomUser);
});
