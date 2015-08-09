var alt = require('../alt');

var ServerActionCreators = require('../actions/ServerActionCreators');

function AuthStore() {
  this.bindActions(ServerActionCreators);

  this.authStatus = {
    authenticated: false,
    isWaiting: false
  };

  this.exportPublicMethods({

    getStatus: function() {
      return this.getState().authStatus;
    }

  });
}

AuthStore.prototype.onAuth = function() {
  this.authStatus.isWaiting = true;
};

AuthStore.prototype.onAuthSuccess = function() {
  this.authStatus.isWaiting = false;
  this.authStatus.authenticated = true;
};

AuthStore.prototype.onAuthError = function() {
  this.authStatus.authenticated = false;
  this.authStatus.isWaiting = false;
};

module.exports = alt.createStore(AuthStore, 'AuthStore');
