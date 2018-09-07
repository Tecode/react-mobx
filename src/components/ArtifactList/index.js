import React from 'react';
import { observer, inject } from 'mobx-react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { defaultApi } from 'api';
import { runInAction } from 'mobx';
import { Modal } from 'antd';
import browserHistory from 'helpers/history';
import styles from './index.less';

function ArticleList({ artifactListStore, uiStore }) {
  const createThumbnail = (link) => {
    return (
      <div className={styles.thumbnail} style={{backgroundImage: `url("${link}")`}}></div>
    );
  };
  const handleClick = (artifactId) => {
    Modal.confirm({
      title: '删除内容',
      content: '确定删除吗?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        artifactListStore.deleteArtifact(artifactId);
      }
    });
  };
  return (
    <Row>
      <Col className={styles.box} xs={{ span: 24 }}>
        <List
          className=""
          pagination={{
            onChange: (page) => {
              runInAction('翻页', () => {
                uiStore.initState.artifactList.index = page;
              });
            },
            showQuickJumper: true,
            total: artifactListStore.total,
            pageSize: 10,
          }}
          loading={artifactListStore.loading}
          itemLayout="horizontal"
          loadMore={false}
          dataSource={artifactListStore.dataList}
          renderItem={item => (
            <List.Item actions={[
              <a onClick={() => {
                browserHistory.push({
                  pathname: '/artifact',
                  search: `?artifact_id=${item.artifactId}`,
                  state: { some: 'state' }
                });
              }}>编辑</a>,
              <a onClick={handleClick.bind(null, item.artifactId)}>删除</a>]}>
              <List.Item.Meta
                avatar={createThumbnail(`${defaultApi.rearEndImageUrl}${item.cover}`)}
                title={<a href="#">{item.title}</a>}
                description={item.artifactText}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
ArticleList.propTypes = {
  articleStore: PropTypes.object
};
export default inject('artifactListStore', 'uiStore')(observer(ArticleList));
