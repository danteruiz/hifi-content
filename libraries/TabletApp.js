function TabletApp(url, isHmtl = false) {
    this.tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    this.isHtml = isHtml;
    this.url = url;
    this.toggleButtonStatus = true;
    this.button = null;
}
