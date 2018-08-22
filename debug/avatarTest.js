function update() {
    var avatarBookmarks = AvatarBookmarks.getBookmarks();
    var avatarEntries = Object.keys(avatarBookmarks);
    print(avatarEntries);
    var avatarEntries = {};
    Script.setTimeout(update, 60);
}

Script.setTimeout(update, 60);
