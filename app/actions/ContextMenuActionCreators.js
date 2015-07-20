var alt = require('../alt');

function ContextMenuActionCreators() {
  this.generateActions('showMenu', 'hideMenu');
}

module.exports = alt.createActions(ContextMenuActionCreators);
