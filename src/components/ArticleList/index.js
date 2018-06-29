import React from 'react';
import { observer, inject } from 'mobx-react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import styles from './index.less';
import { defaultApi } from 'api';
import { runInAction } from 'mobx';

function ArticleList({ articleListStore, uiStore }) {
  const createThumbnail = (link) => {
    return (
      <div className={styles.thumbnail} style={{backgroundImage: `url("${link}")`}}></div>
    );
  };
  return (
    <Row>
      <Col className={styles.box} xs={{ span: 24 }}>
        <List
          className=""
          pagination={{
            onChange: (page) => {
              runInAction('翻页', () => {
                uiStore.initState.articleList.index = page;
              });
              articleListStore.getListData();
            },
            showQuickJumper: true,
            total: articleListStore.total,
            pageSize: 5,
          }}
          loading={articleListStore.loading}
          itemLayout="horizontal"
          loadMore={false}
          dataSource={articleListStore.dataList}
          renderItem={item => (
            <List.Item actions={[<a>编辑</a>, <a>删除</a>]}>
              <List.Item.Meta
                avatar={createThumbnail(`${defaultApi.rearEndImageUrl}${item.imageUrl}`)}
                title={<a href="#">{item.title}</a>}
                description={item.description}
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
export default inject('articleListStore', 'uiStore')(observer(ArticleList));
