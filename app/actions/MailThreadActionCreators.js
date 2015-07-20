var alt = require('../alt');

var Api = require('../utils/APIUtils');

function MailThredActions() {
  this.markThread = function(name, id, val) {
    this.dispatch({name: name, id: id, val: val});

    Api.updateMail(name, parseInt(id, 10), {
      isRead: val
    });
  };

  this.delete = function(name, id) {
    this.dispatch({name: name, id: id});

    Api.deleteEmail(name, parseInt(id, 10));
  };

  this.clickStar = function(payload) {
    Api.updateMail(payload.name, parseInt(payload.id, 10), {
      isStarred: !payload.val
    });
    this.dispatch(payload);
  };
}

module.exports = alt.createActions(MailThredActions);
