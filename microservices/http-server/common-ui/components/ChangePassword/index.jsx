import React from 'react';
import base64 from 'base-64';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import restUrl from '../../restUrl';

export default class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      changePasswordForm: {
        username: { value: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub },
        oldPassword: { value: '', pristine: true, error: '' },
        newPassword: { value: '', pristine: true, error: '' },
        reNewPassword: { value: '', pristine: true, error: '' }
      },
      openFailed: false,
      openSuccess: false
    }
  }

  errors() {
    return {
      oldPassword: 'This field is required',
      newPassword: 'This field is required',
      reNewPassword: 'This field is required',
      reNewPasswordMatch: 'Passwords do not match'
    }
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  handleChange(field,event) {
    const changePasswordForm = this.state.changePasswordForm;
    changePasswordForm[field].value = event.target.value;
    changePasswordForm[field].pristine = false;
    changePasswordForm[field].error = event.target.value === '' ? this.errors()[field] : '';

    if(changePasswordForm.newPassword.value !== '' &&
      changePasswordForm.reNewPassword.value !== '' &&
      changePasswordForm.reNewPassword.error === '' &&
      changePasswordForm.newPassword.value !== changePasswordForm.reNewPassword.value) {
      changePasswordForm.reNewPassword.error = changePasswordForm.reNewPassword.error === '' ? this.errors().reNewPasswordMatch : '';
    }

    this.setState({changePasswordForm});
  }

  handleChangePassword(event) {
    event.preventDefault();
    const changePasswordForm = this.state.changePasswordForm;
    for(let field in changePasswordForm) {
      if(changePasswordForm[field].pristine) { return; }
      if(changePasswordForm[field].error && changePasswordForm[field].error.trim() !== '') {
        return;
      }
    }

    const requestBody = {oldPassword: changePasswordForm.oldPassword.value, password: changePasswordForm.newPassword.value};

    const request = $.ajax({
      url: restUrl + '/api/v1/account',
      type: 'PUT',
      data: JSON.stringify(requestBody),
      contentType: 'application/json',
      headers: {JWT: localStorage.token}
    });
    request.done(function() {
      this.setState({openSuccess: true});
    }.bind(this));
    request.fail(function() {
      this.setState({openFailed: true});
    }.bind(this));
  }

  handleSuccessClose() {
    this.context.router.push('/');
  }

  handleFailClose() {
    this.setState({openFailed: false});
  }

  render() {
    const failDialogActions = [
      <FlatButton
        label="Retry"
        primary={true}
        onTouchTap={this.handleFailClose.bind(this)} />
    ];
    const successDialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleSuccessClose.bind(this)} />
    ];

    return (
      <div>
        <h1>Change Password</h1>
        <form onSubmit={this.handleChangePassword.bind(this)}>
          <TextField
            value={this.state.changePasswordForm.username.value}
            floatingLabelText="Username"
            fullWidth={true} />
          <TextField
            type="password"
            value={this.state.changePasswordForm.oldPassword.value}
            floatingLabelText="Password"
            onChange={this.handleChange.bind(this,'oldPassword')}
            errorText={this.state.changePasswordForm.oldPassword.error}
            errorStyle={{textAlign:'left'}}
            fullWidth={true} />
          <TextField
            type="password"
            value={this.state.changePasswordForm.newPassword.value}
            floatingLabelText="New Password"
            onChange={this.handleChange.bind(this,'newPassword')}
            errorText={this.state.changePasswordForm.newPassword.error}
            errorStyle={{textAlign:'left'}}
            fullWidth={true} />
          <TextField
            type="password"
            value={this.state.changePasswordForm.reNewPassword.value}
            errorText={this.state.changePasswordForm.reNewPassword.error}
            floatingLabelText="Re-type New Password"
            onChange={this.handleChange.bind(this,'reNewPassword')}
            errorStyle={{textAlign:'left'}}
            fullWidth={true} />
          <RaisedButton
            type="submit"
            label="Change"
            primary={true}
            style={{width: '100%', marginTop: '25px'}} />
        </form>
        <Dialog
          title="Unsuccessful"
          actions={failDialogActions}
          modal={true}
          open={this.state.openFailed}>
          Old password does not match with our records. Please try again.
        </Dialog>
        <Dialog
          title="Password Changed"
          actions={successDialogActions}
          modal={true}
          open={this.state.openSuccess}>
          Password changed successfully!
        </Dialog>
      </div>
    );
  }
}
