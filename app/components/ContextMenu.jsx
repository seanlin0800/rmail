var React = require('react');

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');

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
    status: React.PropTypes.object,
    mail: React.PropTypes.object
  },

  _markThread: function() {
    MailThreadActionCreators.markThread(
      this.props.boxName,
      this.props.status.id,
      !this.props.mail.isRead
    );
  },

  _delete: function() {
    MailThreadActionCreators.delete(
      this.props.boxName,
      this.props.status.id
    );
  },

  render: function() {
    var styles = {
      left: this.props.status.xPos,
      top: this.props.status.yPos
    };

    return (
      <div className="context-menu open" style={styles}>
        <ul className="dropdown-menu">
          <li>
            <a href="#" onClick={makeHandler(this._markThread)}>
              Mark as {this.props.mail.isRead ? 'unread' : 'read'}
            </a>
          </li>
          <li>
            <a href="#" onClick={makeHandler(this._delete)}>
              <span className="glyphicon glyphicon-trash" />&nbsp;Delete
            </a>
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = ContextMenu;
