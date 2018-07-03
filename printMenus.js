(function() {
    var menus = Menu.getMenus();
    var menuLength = menus.length;

    for (var index = 0; index < menuLength; index++) {
        print(JSON.stringify(menus[index]));
    }
})();
