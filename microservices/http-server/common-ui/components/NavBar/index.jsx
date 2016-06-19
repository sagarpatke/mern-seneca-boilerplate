import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router';


import ActionExit from 'material-ui/svg-icons/action/exit-to-app';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

export default class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {drawerOpen: false}
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  clearLogin() {
    delete localStorage.token;
    this.context.router.push('/login');
  }

  handleDrawerOpen() {
    this.setState({drawerOpen: true});
  }

  render() {
    return (
      <div>
        <AppBar title="Boilerplate" onLeftIconButtonTouchTap={this.handleDrawerOpen.bind(this)} />
        <Drawer docked={false} width={300} open={this.state.drawerOpen} onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
          <div style={{width: '100%', textAlign: 'center'}}>
            <Avatar size={200} style={{margin: '30px 0 30px'}}>A</Avatar>
          </div>
          <Divider />
          <List>
            <ListItem primaryText="Dashboard" leftIcon={<ActionDashboard />} containerElement={<Link to="/" />} />
            <ListItem primaryText="Change Password" leftIcon={<ActionFingerprint />} containerElement={<Link to="/my-account/change-password" />}/>
            <ListItem primaryText="Logout" leftIcon={<ActionExit />} onTouchTap={this.clearLogin.bind(this)}></ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}
