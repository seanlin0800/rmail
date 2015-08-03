var React = require('react');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var MsgBoxStore = require('../stores/MsgBoxStore');
var Model = require('./Model');

var NewMsgBox = React.createClass({

  mixins: [ListenerMixin],

  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    this.listenTo(MsgBoxStore, this._onChange);
  },

  _renderBoxList: function() {
    var boxList = this.state.boxKeyList;
    var threshold = boxList.length - 2;

    // Only shows last 2 msg boxes
    return boxList.map(function(key, index) {
      return (
        <Model key={key} id={key} isHidden={index < threshold} />
      );
    });
  },

  _getStateFromStores: function() {
    return {
      boxKeyList: MsgBoxStore.getNewMsgKeys()
    };
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  render: function() {
    return (
      <div className="new-message">
        {this._renderBoxList()}
      </div>
    );
  }

});

module.exports = NewMsgBox;
