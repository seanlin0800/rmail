var alt = require('../alt');

function ServerActions() {
  this.generateActions(
    'receiveAll',
    'sendMailSuccess',
    'loginSuccess',
    'loginError',
    'auth',
    'authSuccess',
    'authError'
  );
}

module.exports = alt.createActions(ServerActions);
