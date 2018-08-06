import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ArtifactListContent from 'components/ArtifactList';
import { Helmet } from 'react-helmet';

@inject('artifactListStore', 'uiStore')
@observer
export default class ArticleList extends Component {
  static propTypes = {
    artifactListStore: PropTypes.object,
    uiStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.artifactListStore.getListData();
  }
  componentWillUnmount() {
    this.props.artifactListStore.resetStore();
    this.props.uiStore.resetStore();
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>装逼神器，无形装逼最为致命</title>
        </Helmet>
        <ArtifactListContent />
      </React.Fragment>
    );
  }
}
