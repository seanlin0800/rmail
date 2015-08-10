var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var ListenerMixin = require('alt/mixins/ListenerMixin');
var DocumentTitle = require('react-document-title');

var AuthStore = require('../stores/AuthStore');
var ProgressBar = require('./ProgressBar');
var Site = require('../constants/Site');

var App = React.createClass({

  mixins: [ListenerMixin],

  getInitialState: function() {
    return {isLoading: true};
  },

  componentDidMount: function() {
    this.listenTo(AuthStore, this._onChange);
  },

  _onChange: function() {
    this.setState({isLoading: false});
  },

  _renderHandler: function() {
    return this.state.isLoading ? null : <RouteHandler />;
  },

  render: function() {
    return (
      <DocumentTitle title={Site.TITLE}>
        <div className="main">
          {this._renderHandler()}
          <ProgressBar />
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = App;
