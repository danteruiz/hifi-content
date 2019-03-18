(function () {

    function kickRandomUser() {
        print("Dante: kicking");
        var avatars =  AvatarList.getAvatarIdentifiers();

        Users.kick(avatars[Math.floor(Math.random()*avatars.length)]);
        print("kicking user");
    }

    Script.update.connect(kickRandomUser);
});
