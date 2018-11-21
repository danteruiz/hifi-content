//domainConnectionStatus.js


(function() {
    Window.domainConnectionRefused.connect(function(reasonMessage, reasonCode, extraInfo) {
        print(reasonMessage);
        print(reasonCode);
        print(extraInfo);
    });

    AddressManager.lookupResultIsOffline.connect(function() {
        print("---> offline");
    });

    AddressManager.lookupResultsFinished.connect(function() {
        print("---> lookup finished <0---");
        print(location.isConnected);
    });

    AddressManager.lookupResultIsNotFound.connect(function() {
        print("---> not found <---");
    });
}());
