var alt = require('../alt');

var Api = require('../utils/APIUtils');

function MailActionCreators() {
  this.generateActions('addNewMsgBox', 'delNewMsgBox');

  this.sendMail = function(obj) {
    obj.date = (new Date()).toISOString();
    this.dispatch();

    Api.sendMail(obj);
  };
}

module.exports = alt.createActions(MailActionCreators);
