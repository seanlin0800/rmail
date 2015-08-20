var alt = require('../alt');

var Api = require('../utils/APIUtils');

function MailThredActions() {
  this.markThread = function(payload) {
    Api.updateMail(payload.name, parseInt(payload.id, 10), {
      isRead: payload.val
    });
    this.dispatch(payload);
  };

  this.markAll = function(payload) {
    Api.markAll(payload);
    this.dispatch(payload);
  };

  this.delete = function(payload) {
    Api.deleteEmail(payload.name, parseInt(payload.id, 10));
    this.dispatch(payload);
  };

  this.clickStar = function(payload) {
    Api.updateMail(payload.name, parseInt(payload.id, 10), {
      isStarred: payload.val
    });
    this.dispatch(payload);
  };

  this.addCheck = function(payload) {
    this.dispatch(payload);
  };

  this.check = function(payload) {
    this.dispatch(payload);
  };
}

module.exports = alt.createActions(MailThredActions);
