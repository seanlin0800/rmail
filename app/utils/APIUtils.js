/**
 * A module of API tying to simulate client-server communication
 * and using sessionStorage as the database
 */

var assign = require('object-assign');

var ServerActionCreators = require('../actions/ServerActionCreators');

//
// Simulate database operations
//
function getDataFromDB() {
  return JSON.parse(sessionStorage.getItem('mails'));
}

function saveDataToDB(data) {
  sessionStorage.setItem('mails', JSON.stringify(data));
}

function getBoxByName(data, name) {
  var i;
  var len = data.length;

  for (i = 0; i < len; i++) {
    if (name === data[i].name) {
      return data[i];
    }
  }

  return {};
}

function insertNewMail(obj) {
  var data = getDataFromDB();
  var box = getBoxByName(data, 'sent');
  var id = 0;

  if (box.emails.length > 0) {
    id = box.emails.slice(-1)[0].id + 1;
  }

  obj.id = id;
  box.emails.push(obj);
  saveDataToDB(data);

  return id;
}

module.exports = {

  getBoxData: function() {
    var data = getDataFromDB();
    ServerActionCreators.receiveAll(data);
  },

  getEmail: function(data, name, id) {
    var box = getBoxByName(data, name);
    var i;
    var len = box.emails.length;

    for (i = 0; i < len; i++) {
      if (id === box.emails[i].id) {
        return box.emails[i];
      }
    }

    return {};
  },

  updateMail: function(name, id, payload) {
    var data = getDataFromDB();
    var mail = this.getEmail(data, name, id);

    assign(mail, payload);
    saveDataToDB(data);
  },

  deleteEmail: function(name, id) {
    var data = getDataFromDB();
    var box = getBoxByName(data, name);
    var i;
    var len = box.emails.length;

    for (i = 0; i < len; i++) {
      if (id === box.emails[i].id) {
        box.emails.splice(i, 1);
        saveDataToDB(data);
        return;
      }
    }
  },

  sendMail: function(obj) {
    obj.id = insertNewMail(assign({}, obj));

    // simulate success callback
    setTimeout(function() {
      ServerActionCreators.sendMailSuccess(obj);
    }, 0);
  }

};
