var alt = require('../alt');

function ServerActions() {
  this.generateActions('receiveAll', 'sendMailSuccess');
}

module.exports = alt.createActions(ServerActions);
