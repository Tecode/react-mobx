import React, { Component } from 'react';
import { observer } from 'mobx-react';
import InputCodeContent from 'components/InputCode';
import { Helmet } from 'react-helmet';

@observer
export default class ArticleList extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>插入代码</title>
        </Helmet>
        <InputCodeContent />
      </React.Fragment>
    );
  }
}
