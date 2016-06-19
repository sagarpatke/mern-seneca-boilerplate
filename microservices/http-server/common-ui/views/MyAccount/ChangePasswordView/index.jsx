import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import NavBar from '../../../components/NavBar';
import ChangePassword from '../../../components/ChangePassword';

export default class ChangePasswordView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row center-xs">
            <Paper className="col-lg-5 col-md-6 col-sm-7" style={{padding: '50px', margin: '50px 50px 0'}}>
              <ChangePassword />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
