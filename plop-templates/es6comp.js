import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
export default class {{ properCase name }} extends Component {
  static propTypes = {
    foo: PropTypes.string
  };
  render() {
    return (
      <div>

      </div>
    );
  }
}
