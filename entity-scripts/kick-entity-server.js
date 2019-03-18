(function () {
    function kickRandomUser() {
        Users.kick("3ceced32-64d6-4507-ae11-8208970f103d");
    }

    Script.update.connect(kickRandomUser);
});
