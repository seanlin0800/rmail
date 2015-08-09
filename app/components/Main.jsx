var React = require('react');

var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');
var ContextMenuStore = require('../stores/ContextMenuStore');
var NewMsgBox = require('./NewMsgBox');
var NotificationBox = require('./NotificationBox');
var Sidebar = require('./Sidebar');
var Section = require('./Section');
var Header = require('./Header');
var UserStore = require('../stores/UserStore');

var Main = React.createClass({

  statics: {
    willTransitionTo: function(transition) {
      if (!UserStore.isLoggedIn()) {
        transition.redirect('/login', {}, {
          nextPath: transition.path
        });
      }
    }
  },

  _handleClick: function() {
    // Context menu should be hidden when the user clicks
    // anywhere on the page other than the menu itself
    if (ContextMenuStore.isMenuActive()) {
      ContextMenuActionCreators.hideMenu();
    }
  },

  render: function() {
    return (
      <div className="main" onClick={this._handleClick}>
        <Header />
        <div className="container">
          <div className="row">
            <Sidebar />
            <Section />
          </div>
        </div>
        <NewMsgBox />
        <NotificationBox />
      </div>
    );
  }

});

module.exports = Main;
