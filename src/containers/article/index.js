import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ArticleContent from 'components/Article';
import { Helmet } from 'react-helmet';
import { parse } from 'query-string';

@inject('articleStore')
@observer
export default class Article extends Component {
  static propTypes = {
    articleStore: PropTypes.object,
    location: PropTypes.object,
  };
  componentDidMount() {
    const articleId = parse(this.props.location.search).article_id;
    if (articleId) {
      console.log(articleId);
    }
  }
  componentWillUnmount() {
    this.props.articleStore.resetStore();
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>内容相关-新增-编辑-修改</title>
        </Helmet>
        <ArticleContent />
      </React.Fragment>
    );
  }
}
