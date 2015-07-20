var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Main = require('./components/Main');
var Mailbox = require('./components/Mailbox');
var Email = require('./components/Email');
var NoneSelected = require('./components/NoneSelected');

var routes = (
  <Route name="app" path="/" handler={Main}>
    <Route name="mailboxes" path="/:name" handler={Mailbox} />
    <Route name="mails" path="/:name/:id" handler={Email} />
    <DefaultRoute handler={NoneSelected.create('box')} />
  </Route>
);

module.exports = routes;
