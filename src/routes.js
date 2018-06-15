import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  App,
  LoginForm
} from 'containers';

export default () => {
  return (
    <Switch>
      <Route path="/login" name="login" component={LoginForm} />
      <Route path="/" name="home" component={App} />
    </Switch>
  );
};
