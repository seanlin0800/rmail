var React = require('react');
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var EmailStore = require('../stores/EmailStore');
var ActionApi = require('../utils/MailActionUtils');

var craeteWorkFlow = function(boxName) {
  return [
    {
      name: 'read',
      text: 'Mark as read',
      action: ActionApi.markThread.bind(null, boxName, true)
    },
    {
      name: 'unread',
      text: 'Mark as unread',
      action: ActionApi.markThread.bind(null, boxName, false)
    },
    {
      name: 'star',
      text: 'Add star',
      action: ActionApi.clickStar.bind(null, boxName, true)
    },
    {
      name: 'unstar',
      text: 'Remove star',
      action: ActionApi.clickStar.bind(null, boxName, false)
    }
  ];
};

var ActionButton = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    initMails: React.PropTypes.array
  },

  getInitialState: function() {
    return {checkedMails: this.props.initMails};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      checkedMails: nextProps.initMails
    });
  },

  _updateMenuMap: function(menuMap, mail) {
    var modified = false;

    if (!menuMap.read && !mail.isRead) {
      menuMap.read = true;
      modified = true;
    }

    if (!menuMap.unread && mail.isRead) {
      menuMap.unread = true;
      modified = true;
    }

    if (!menuMap.star && !mail.isStarred) {
      menuMap.star = true;
      modified = true;
    }

    if (!menuMap.unstar && mail.isStarred) {
      menuMap.unstar = true;
      modified = true;
    }

    return modified;
  },

  _getMenuMap: function() {
    var mail;
    var i;
    var len = this.state.checkedMails.length;
    var modified;
    var menuMap = {
      read: false,
      unread: false,
      star: false,
      unstar: false
    };

    for (i = 0; i < len; i++) {
      mail = EmailStore.get(this.props.boxName, this.state.checkedMails[i]);
      modified = this._updateMenuMap(menuMap, mail);

      if (!modified) {
        break;
      }
    }

    return menuMap;
  },

  _markAll: function() {
    MailThreadActionCreators.markAll({
      name: this.props.boxName,
      val: true
    });
  },

  _renderMenuItems: function() {
    var menuMap = this._getMenuMap();
    var flow = craeteWorkFlow(this.props.boxName);
    var menuItems = [];
    var i;
    var len = flow.length;

    for (i = 0; i < len; i++) {
      if (!menuMap[flow[i].name]) {
        continue;
      }
      menuItems.push(
        <MenuItem
          key={i}
          onClick={flow[i].action}
        >
          {flow[i].text}
        </MenuItem>
      );
    }

    return menuItems;
  },

  render: function() {
    if (this.state.checkedMails.length > 0) {
      return (
        <SplitButton title="More">
          {this._renderMenuItems()}
        </SplitButton>
      );
    }
    return (
      <SplitButton title="More">
        <MenuItem onClick={this._markAll}>Mark all as read</MenuItem>
        <MenuItem divider />
        <li className="menu-item">Select messages to see more actions</li>
      </SplitButton>
    );
  }

});

module.exports = ActionButton;
