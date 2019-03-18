(function () {

    function kickRandomUser() {
        print("Dante: kicking");

        Users.kick("3ceced32-64d6-4507-ae11-8208970f103d");
        print("kicking user");
    }

    Script.update.connect(kickRandomUser);
});
