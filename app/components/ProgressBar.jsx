var React = require('react');
var ListenerMixin = require('alt/mixins/ListenerMixin');
var nprogress = require('nprogress');

var ProgressBarStore = require('../stores/ProgressBarStore');

var ProgressBar = React.createClass({

  mixins: [ListenerMixin],

  componentDidMount: function() {
    this.listenTo(ProgressBarStore, this._onChange);
  },

  _onChange: function() {
    if (ProgressBarStore.isLoading()) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  },

  render: function() {
    return <div />;
  }

});

module.exports = ProgressBar;
