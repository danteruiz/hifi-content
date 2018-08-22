"use strict";

(function() {
    Script.include("./Util.js");
    var request = Script.require('request').request;
    var mute = false;
    var domainAvatars = AvatarList.getAvatarIdentifiers();

    var metaverse = Account.metaverseServerURL + '/api/v1/';
    testPrint();
    var options = [
        'include_actions=concurrency',
        'domain_id=' + location.domainID
    ];
    var url = metaverse + 'user_stories?' + options.join('&');
    request({
        uri: url
    }, function(error, data) {
        if (error || data.status !== 'success') {
            return;
        }
        print(JSON.stringify(data));
    }
           );
})();
