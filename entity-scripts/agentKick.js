

function kickRandomUser() {
    print("Dante: start kick");
    var avatars =  AvatarList.getAvatarIdentifiers();

    Users.kick(avatars[Math.floor(Math.random()*avatars.length)]);
    print("kicking user");
}

Script.update.connect(kickRandomUser);

