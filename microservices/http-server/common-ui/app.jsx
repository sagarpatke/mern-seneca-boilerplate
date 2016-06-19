import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Router, Route, Link, hashHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import ChangePasswordView from './views/MyAccount/ChangePasswordView';

const verifyLogin = function(nextState, replace) {
  if(!localStorage.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  };
};

const handleLoginEnter = function(nextState, replace) {
  if(localStorage.token) {
    replace({
      pathname: '/'
    });
  }
};

const clearLogin = function(nextState, replace) {
  delete localStorage.token;
};

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/login" component={LoginView} onEnter={handleLoginEnter} />
      <Route path="/" component={DashboardView} onEnter={verifyLogin} />
      <Route path="my-account/change-password" component={ChangePasswordView} onEnter={verifyLogin} />
    </Router>
  </MuiThemeProvider>
, document.getElementById('root'));
