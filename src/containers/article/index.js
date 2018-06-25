import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/zh_cn.js';
import FroalaEditor from 'components/FroalaEditor';
import Button from 'antd/lib/button';
import styles from './index.less';

@inject('articleStore')
@observer
export default class HomePage extends Component {
  static propTypes = {
    articleStore: PropTypes.object
  };
  constructor() {
    super();
  }
  handleModelChange = (htmlContent) => {
    this.props.articleStore.setValue('htmlContent', htmlContent);
  }
  render() {
    const { articleStore } = this.props;
    return (
    <React.Fragment>
      <FroalaEditor
        tag="textarea"
        config={articleStore.editorConfig}
        model={articleStore.htmlContent}
        onModelChange={this.handleModelChange}
      />
      <Button
        onClick={articleStore.getHtml}
        className={styles.button}
        type="primary"
        loading={false}>
        保存
      </Button>
    </React.Fragment>
    );
  }
}
