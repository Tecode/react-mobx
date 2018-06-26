import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/languages/zh_cn.js';
import FroalaEditor from 'components/FroalaEditor';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import LeftContent from './LeftContent';

function ArticleContent({ articleStore }) {
  const handleModelChange = (htmlContent) => {
    articleStore.setValue('htmlContent', htmlContent);
  };
  return (
    <Row>
      <Col xs={{ span: 5 }}>
        <LeftContent />
      </Col>
      <Col xs={{ span: 18, offset: 1 }}>
          <FroalaEditor
            tag="textarea"
            config={articleStore.editorConfig}
            model={articleStore.htmlContent}
            onModelChange={handleModelChange}
          />
      </Col>
    </Row>
  );
}
ArticleContent.propTypes = {
  articleStore: PropTypes.object
};
export default inject('articleStore')(observer(ArticleContent));
