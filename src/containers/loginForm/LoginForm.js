import React from 'react';
import Helmet from 'react-helmet';
import LoginFormBody from 'components/LoginForm';

export default class LoginForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>登录</title>
        </Helmet>
        <LoginFormBody />
      </React.Fragment>);
  }
}
