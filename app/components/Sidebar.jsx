var React = require('react');
var MailActionCreators = require('../actions/MailActionCreators');

var MailboxList = require('./MailboxList');

var Sidebar = React.createClass({

  _clickCompose: function() {
    MailActionCreators.addNewMsgBox();
  },

  render: function() {
    return (
      <div className="col-md-2 sidebar">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={this._clickCompose}>
            COMPOSE
        </button>
        <MailboxList />
      </div>
    );
  }

});

module.exports = Sidebar;
