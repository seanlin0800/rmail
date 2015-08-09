var React = require('react');
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;

var UserActionCreators = require('../actions/UserActionCreators');
var Site = require('../constants/Site');
var MailUtils = require('../utils/MailUtils');

var Header = React.createClass({

  _handleLogOut: function(e) {
    e.preventDefault();
    UserActionCreators.logout(MailUtils.getUserName());
  },


  render: function() {
    return (
      <Navbar brand={<a href="#">{Site.TITLE}</a>} toggleNavKey={0} fixedTop={true}>
        <Nav right eventKey={1}>
          <DropdownButton title={MailUtils.getUserName()}>
            <MenuItem onClick={this._handleLogOut}>Sign out</MenuItem>
          </DropdownButton>
          <NavItem href="https://github.com/seanlin0800/rmail">About</NavItem>
        </Nav>
      </Navbar>
    );
  }

});

module.exports = Header;
