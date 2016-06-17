import React from 'react';
import Paper from 'material-ui/Paper';

import LoginForm from '../../components/LoginForm';

export default class LoginView extends React.Component {
  render() {
    return (
      <div className="row center-xs">
        <div className="col-lg-5 col-md-6 col-sm-7">
          <Paper style={{padding: '50px', margin: '50px'}}>
            <LoginForm />
          </Paper>
        </div>
      </div>
    );
  }
}
