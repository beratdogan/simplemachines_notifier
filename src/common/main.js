function SM_Notifier() {
    var self = this;

    self.refresh();

    kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
        self._redirectToSite();

        self.refresh();
    });

    window.setInterval(function() {
        self.refresh()
    }, self._refreshTimeout);
}

SM_Notifier.prototype = {

    _redirectToSite: function() {
        kango.browser.tabs.create({url: 'http://simplemachines.org/'});
    },

    _refreshTimeout: 60 * 1000 * 15, // 15 minutes
    _feedUrl: 'http://www.simplemachines.org/community/index.php?wap2',

    _setOffline: function() {
        kango.ui.browserButton.setTooltipText(kango.i18n.getMessage('Offline. Maybe you only need to login on SM.org ?'));
        kango.ui.browserButton.setIcon('icons/button_gray.png');
        kango.ui.browserButton.setBadgeValue(0);
    },

    _setUnreadCount: function(count) {
        kango.ui.browserButton.setTooltipText(kango.i18n.getMessage('Unread PMs count') + ': ' + count);
        kango.ui.browserButton.setIcon('icons/button.png');
        kango.ui.browserButton.setBadgeValue(count);
    },

    _checkPMs: function() {
        var details = {
            url: this._feedUrl,
            method: 'GET',
            async: true,
            contentType: 'text'
        };

		var self = this;

        kango.xhr.send(details, function(data) {
            if (data.status == 200 && data.response != null) {
                var count = 0;
                var matches = data.response.match(/<a href=".+?\?action=pm;wap2">.+?\(<[^>]+>(\d+)/);
                if (matches != null && matches.length > 0) {
                    count = matches[1];
                }
                self._setUnreadCount(count);
            }
            else {
                self._setOffline();
            }
        });
    },

    refresh: function() {
    	this._checkPMs();
    }
};

var extension = new SM_Notifier();