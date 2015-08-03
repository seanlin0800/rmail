var alt = require('../alt');

var MailActionCreators = require('../actions/MailActionCreators');

function MsgBoxStore() {
  this.bindActions(MailActionCreators);
  this.newMsgBoxes = {};
  this.newMsgBoxId = 0;

  this.exportPublicMethods({

    getNewMsgKeys: function() {
      return Object.keys(this.getState().newMsgBoxes);
    }

  });
}

MsgBoxStore.prototype.onAddNewMsgBox = function() {
  this.newMsgBoxes[this.newMsgBoxId++] = 1;
};

MsgBoxStore.prototype.onDelNewMsgBox = function(key) {
  delete this.newMsgBoxes[key];
};

module.exports = alt.createStore(MsgBoxStore, 'MsgBoxStore');
