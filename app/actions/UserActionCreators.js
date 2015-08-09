var alt = require('../alt');

var Api = require('../utils/APIUtils');

function UserActionCreators() {
  this.login = function(obj) {
    this.dispatch();

    Api.login(obj);
  };

  this.logout = function(obj) {
    this.dispatch();

    Api.logout(obj);
  };
}

module.exports = alt.createActions(UserActionCreators);
