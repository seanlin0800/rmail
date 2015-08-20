var React = require('react');

var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');
var EmailStore = require('../stores/EmailStore');
var CheckedEmailStore = require('../stores/CheckedEmailStore');
var ActionApi = require('../utils/MailActionUtils');

var makeHandler = function(func) {
  return function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
    ContextMenuActionCreators.hideMenu();
  };
};

var ContextMenu = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    status: React.PropTypes.object
  },

  _findReadCheckedMails: function() {
    var checkedMails = CheckedEmailStore.getCheckedMails(this.props.boxName);
    var mail;
    var i;
    var len = checkedMails.length;

    for (i = 0; i < len; i++) {
      mail = EmailStore.get(this.props.boxName, checkedMails[i]);
      if (mail.isRead) {
        return true;
      }
    }

    return false;
  },

  _renderMenuItem: function() {
    var isRead = this._findReadCheckedMails();
    var handler = makeHandler(
      ActionApi.markThread.bind(null, this.props.boxName, !isRead)
    );

    return (
      <li>
        <a href="#" onClick={handler}>
          Mark as {isRead ? 'unread' : 'read'}
        </a>
      </li>
    );
  },

  render: function() {
    var styles = {
      left: this.props.status.xPos,
      top: this.props.status.yPos
    };
    var handler = makeHandler(
      ActionApi.delete.bind(null, this.props.boxName)
    );

    return (
      <div className="context-menu open" style={styles}>
        <ul className="dropdown-menu">
          {this._renderMenuItem()}
          <li>
            <a href="#" onClick={handler}>
              <span className="glyphicon glyphicon-trash" />&nbsp;Delete
            </a>
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = ContextMenu;
