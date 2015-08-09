var alt = require('../alt');

var MailAction = require('../actions/MailActionCreators');
var UserAction = require('../actions/UserActionCreators');
var ServerAction = require('../actions/ServerActionCreators');

function ProgressBarStore() {
  this.bindListeners({
    startLoading: [
      MailAction.SEND_MAIL,
      UserAction.LOGIN,
    ],
    stopLoading: [
      ServerAction.SEND_MAIL_SUCCESS,
      ServerAction.LOGIN_SUCCESS,
      ServerAction.LOGIN_ERROR
    ]
  });

  this.loading = false;

  this.exportPublicMethods({

    isLoading: function() {
      return this.getState().loading;
    }

  });
}

ProgressBarStore.prototype.startLoading = function() {
  this.loading = true;
};

ProgressBarStore.prototype.stopLoading = function() {
  this.loading = false;
};

module.exports = alt.createStore(ProgressBarStore, 'ProgressBarStore');
