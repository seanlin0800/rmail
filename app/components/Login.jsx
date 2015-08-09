var React = require('react');
var Router = require('react-router');
var ListenerMixin = require('alt/mixins/ListenerMixin');

var UserActionCreators = require('../actions/UserActionCreators');
var UserStore = require('../stores/UserStore');
var Site = require('../constants/Site');

var Login = React.createClass({

  mixins: [ListenerMixin, Router.Navigation, Router.State],

  statics: {
    willTransitionTo: function(transition) {
      if (UserStore.isLoggedIn()) {
        transition.redirect('main', {});
      }
    }
  },

  getInitialState: function() {
    return {error: false};
  },

  componentDidMount: function() {
    this.listenTo(UserStore, this._onChange);
  },

  _onChange: function() {
    var nextPath = this.getQuery().nextPath;

    if (UserStore.isWaiting()) {
      return;
    }

    // login process is done
    if (UserStore.isAuth()) {
      if (nextPath) {
        this.replaceWith(nextPath);
      } else {
        this.replaceWith('main');
      }
    } else {
      this.setState({error: true});
    }
  },

  _handleLogIn: function(e) {
    var email = React.findDOMNode(this.refs.email).value;
    var password = React.findDOMNode(this.refs.password).value;

    e.preventDefault();

    UserActionCreators.login({
      email: email,
      password: password
    });
  },

  _renderErrorMsg: function() {
    if (this.state.error) {
      return (
        <span className="text-danger">
          The email and password you entered don't match.
        </span>
      );
    }

    return null;
  },

  render: function() {
    return (
      <form className="form-signin" onSubmit={this._handleLogIn}>
        <h3 className="form-signin-heading text-center">Sign in to continue to {Site.TITLE}</h3>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" ref="email" className="form-control" placeholder="Email address" autoFocus={true} />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" ref="password" className="form-control" placeholder="Password" />
        <button className="btn btn-primary btn-block" type="submit">Sign in</button>
        <p>Hint: email: seanlin0800@rmail.com password: pass</p>
        {this._renderErrorMsg()}
      </form>
    );
  }

});

module.exports = Login;
