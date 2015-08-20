var alt = require('../alt');

function ServerActions() {
  this.generateActions(
    'receiveAll',
    'sendMailSuccess',
    'loginSuccess',
    'loginError',
    'auth',
    'authSuccess',
    'authError',
    'markAllSuccess',
    'markAllCanceled'
  );
}

module.exports = alt.createActions(ServerActions);
