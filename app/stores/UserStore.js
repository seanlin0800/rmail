var alt = require('../alt');

var UserActionCreators = require('../actions/UserActionCreators');
var ServerActionCreators = require('../actions/ServerActionCreators');
var AuthStore = require('./AuthStore');

function UserStore() {
  this.bindActions(UserActionCreators);
  this.bindActions(ServerActionCreators);

  this.user = {
    name: '',
    authenticated: false
  };

  this.exportPublicMethods({

    isLoggedIn: function() {
      return this.getState().user.authenticated;
    },

    getUser: function() {
      return this.getState().user;
    }

  });
}

UserStore.prototype.onAuthSuccess = function(obj) {
  this.waitFor([AuthStore.dispatchToken]);
  this.user.name = obj.name;
  this.user.authenticated = true;
};

UserStore.prototype.onLoginSuccess = function(obj) {
  this.user.name = obj.name;
  this.user.authenticated = true;
  sessionStorage.setItem('user', JSON.stringify(obj));
};

UserStore.prototype.onLoginError = function() {
  this.user.authenticated = false;
};

UserStore.prototype.onLogout = function() {
  this.user.authenticated = false;
  sessionStorage.removeItem('user');
};

module.exports = alt.createStore(UserStore, 'UserStore');
