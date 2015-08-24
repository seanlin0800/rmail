var React = require('react');

var ContextMenuActionCreators = require('../actions/ContextMenuActionCreators');
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

  _renderMenuItem: function() {
    var boxName = this.props.boxName;
    var isRead = CheckedEmailStore.getCountMap(boxName).read > 0;
    var handler = makeHandler(
      ActionApi.markThread.bind(null, boxName, !isRead)
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
