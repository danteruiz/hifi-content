(function() {
    var request = Script.require('request').request;
    Window.domainChanged.connect(function(domain) {
        print("domainChanged: " + domain);
        print("----> hostChanged: " + domain);
        Script.setTimeout(function() {
            print("----> domainID: " + location.domainID);

            var options = [
                'include_actions=concurrency',
                'domain_id=' + location.domainID
            ];
            var url = Account.metaverseServerURL + '/api/v1/user_stories?' + options.join('&');
            print("URL: " + url);
            request({
                uri: url
            }, function(error, data) {
                print("error: " + error);
                print("data: " + JSON.stringify(data));
            });
        }, 900);
    });

    location.hostChanged.connect(function(domain) {
        print("----> hostChanged: " + domain);
        Script.setTimeout(function() {
            print("----> domainID: " + location.domainID);

            var options = [
                'include_actions=concurrency',
                'domain_id=' + location.domainID
            ];
            var url = Account.metaverseServerURL + '/api/v1/user_stories?' + options.join('&');
            print("URL: " + url);
            request({
                uri: url
            }, function(error, data) {
                print("error: " + error);
                print("data: " + JSON.stringify(data));
            });
        }, 900);
    });
}());
