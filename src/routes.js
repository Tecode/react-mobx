import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  App,
  HomePage
} from 'containers';

export default () => {
  return (
    <Switch>
      <Route path="/login" name="login" component={HomePage} />
      <Route path="/" name="home" component={App} />
    </Switch>
  );
};
