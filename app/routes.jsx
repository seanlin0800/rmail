var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App');
var Login = require('./components/Login');
var Main = require('./components/Main');
var Mailbox = require('./components/Mailbox');
var Email = require('./components/Email');
var NoneSelected = require('./components/NoneSelected');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={Login} />
    <Route name="main" path="/mail" handler={Main}>
      <Route name="mailboxes" path="/mail/:name" handler={Mailbox} />
      <Route name="mails" path="/mail/:name/:id" handler={Email} />
      <DefaultRoute handler={NoneSelected.create('box')} />
    </Route>
    <DefaultRoute handler={Login} />
  </Route>
);

module.exports = routes;
