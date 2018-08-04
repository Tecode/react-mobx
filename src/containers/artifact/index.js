import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ArtifactBody from 'components/Artifact';

@observer
export default class HomePage extends Component {
  render() {
    return <ArtifactBody />;
  }
}
