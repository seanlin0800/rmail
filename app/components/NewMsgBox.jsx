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

  _getStateFromStores: function() {
    return {
      boxKeyList: MsgBoxStore.getNewMsgKeys()
    };
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  render: function() {
    var boxList = this.state.boxKeyList.map(function(key) {
      return (
        <Model key={key} id={key}/>
      );
    });

    return (
      <div className="new-message">
        {boxList}
      </div>
    );
  }

});

module.exports = NewMsgBox;
