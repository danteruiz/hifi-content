(function() {
    function Test() {
        var _this = this;
        this.update = function() {
            print("testing");
            Script.setTimeOut(_this.update, 60);
        };
    }

    var a = new Test();
    Script.setTimeout(a.update, 60);
})();
