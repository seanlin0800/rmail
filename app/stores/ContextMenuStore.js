var alt = require('../alt');
var assign = require('object-assign');

var CheckedEmailStore = require('./CheckedEmailStore');
var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');

function ContextMenuStore() {
  this.bindActions(ContextMenuActionCreators);

  this.isActive = false;
  this.menuState = {
    xPos: 0,
    yPos: 0,
    id: -1
  };

  this.exportPublicMethods({

    isMenuActive: function() {
      return this.getState().isActive;
    },

    getMenuState: function() {
      return this.getState().menuState;
    }

  });
}

ContextMenuStore.prototype.onShowMenu = function(obj) {
  this.waitFor([CheckedEmailStore.dispatchToken]);
  this.isActive = true;
  assign(this.menuState, obj);
};

ContextMenuStore.prototype.onHideMenu = function() {
  this.isActive = false;
};

module.exports = alt.createStore(ContextMenuStore, 'ContextMenuStore');
