import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default class NavBar extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  clearLogin() {
    delete localStorage.token;
    this.context.router.push('/login');
  }

  render() {
    const logoutButton = <FlatButton label="Logout" onTouchTap={this.clearLogin.bind(this)}/>

    return (
      <AppBar title="App Name" iconElementRight={logoutButton} />
    );
  }
}
