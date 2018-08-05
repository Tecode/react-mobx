import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import { toJS } from 'mobx';

function ArticleList({ fontListStore, uiStore }) {
  console.log(fontListStore, uiStore);

  const columns = [{
    title: '字体名称',
    dataIndex: 'fontLocalName',
    key: 'fontLocalName',
  }, {
    title: '字体别名',
    dataIndex: 'uploadFont',
    key: 'uploadFont',
  }, {
    title: 'ID号',
    dataIndex: 'artifactId',
    key: 'artifactId',
  }];
  return (
    <Row>
      <Col xs={{ span: 24 }}>
        <Table dataSource={toJS(fontListStore.fontListData)} columns={columns} />
      </Col>
    </Row>
  );
}
ArticleList.propTypes = {
  articleStore: PropTypes.object
};
export default inject('fontListStore', 'uiStore')(observer(ArticleList));
