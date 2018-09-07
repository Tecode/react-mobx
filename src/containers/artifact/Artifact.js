import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ArtifactBody from 'components/Artifact';
import PropTypes from 'prop-types';
import { parse } from 'query-string';


@inject('artifactStore')
@observer
export default class HomePage extends Component {
  static propTypes = {
    artifactStore: PropTypes.object,
    location: PropTypes.object,
  };
  componentDidMount() {
    const artifactId = parse(this.props.location.search).artifact_id;
    if (artifactId) {
      this.props.artifactStore.setNormalValue('isEdit', true);
      this.props.artifactStore.getArticleData(artifactId);
    }
  }
  componentWillUnmount() {
    this.props.artifactStore.resetStore();
  }
  render() {
    return <ArtifactBody />;
  }
}
