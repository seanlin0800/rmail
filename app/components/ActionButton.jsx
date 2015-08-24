var React = require('react');
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;

var MailThreadActionCreators = require('../actions/MailThreadActionCreators');
var CheckedEmailStore = require('../stores/CheckedEmailStore');
var ActionApi = require('../utils/MailActionUtils');

var craeteWorkFlow = function(boxName) {
  return [
    {
      name: 'read',
      text: 'Mark as unread',
      action: ActionApi.markThread.bind(null, boxName, false)
    },
    {
      name: 'unread',
      text: 'Mark as read',
      action: ActionApi.markThread.bind(null, boxName, true)
    },
    {
      name: 'starred',
      text: 'Remove star',
      action: ActionApi.clickStar.bind(null, boxName, false)
    },
    {
      name: 'unstarred',
      text: 'Add star',
      action: ActionApi.clickStar.bind(null, boxName, true)
    }
  ];
};

var ActionButton = React.createClass({

  propTypes: {
    boxName: React.PropTypes.string,
    checkedNum: React.PropTypes.number
  },

  _markAll: function() {
    MailThreadActionCreators.markAll({
      name: this.props.boxName,
      val: true
    });
  },

  _getMenuItems: function() {
    var map = CheckedEmailStore.getCountMap(this.props.boxName);
    var flow = craeteWorkFlow(this.props.boxName);
    var menuItems = [];
    var i;
    var len = flow.length;

    for (i = 0; i < len; i++) {
      if (map[flow[i].name] === 0) {
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

  _renderMenuItems: function() {
    if (this.props.checkedNum > 0) {
      return this._getMenuItems();
    }
    return [
      <MenuItem key={0} onClick={this._markAll}>Mark all as read</MenuItem>,
      <MenuItem key={1} divider />,
      <li key={2} className="menu-item">Select messages to see more actions</li>
    ];
  },

  render: function() {
    return (
      <SplitButton title="More">
        {this._renderMenuItems()}
      </SplitButton>
    );
  }

});

module.exports = ActionButton;
