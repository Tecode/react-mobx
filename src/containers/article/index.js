import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ArticleContent from 'components/Article';

@inject('articleStore')
@observer
export default class Article extends Component {
  render() {
    return <ArticleContent />;
  }
}
