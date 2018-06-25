import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/zh_cn.js';
import FroalaEditor from 'components/FroalaEditor';

@inject('articleStore')
@observer
export default class HomePage extends Component {
  static propTypes = {
    articleStore: PropTypes.object
  };
  constructor() {
    super();
  }
  render() {
    return (
      <FroalaEditor
        tag="textarea"
        config={this.props.articleStore.editorConfig}
      />
    );
  }
}
