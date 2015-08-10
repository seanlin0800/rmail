var alt = require('../alt');

var ServerActionCreators = require('../actions/ServerActionCreators');

function AuthStore() {
  this.bindActions(ServerActionCreators);

  this.authStatus = {
    authenticated: false
  };

  this.exportPublicMethods({

    getStatus: function() {
      return this.getState().authStatus;
    }

  });
}

AuthStore.prototype.onAuthSuccess = function() {
  this.authStatus.authenticated = true;
};

AuthStore.prototype.onAuthError = function() {
  this.authStatus.authenticated = false;
};

module.exports = alt.createStore(AuthStore, 'AuthStore');
