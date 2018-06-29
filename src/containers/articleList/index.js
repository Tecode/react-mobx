import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ArticleListContent from 'components/ArticleList';
import { Helmet } from 'react-helmet';

@inject('articleListStore', 'uiStore')
@observer
export default class ArticleList extends Component {
  static propTypes = {
    articleListStore: PropTypes.object,
    uiStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.articleListStore.getListData();
  }
  componentWillUnmount() {
    this.props.articleListStore.resetStore();
    this.props.uiStore.resetStore();
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>文章列表</title>
        </Helmet>
        <ArticleListContent />
      </React.Fragment>
    );
  }
}
