import React from 'react';
import { observer, inject } from 'mobx-react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { defaultApi } from 'api';
import { runInAction } from 'mobx';
import browserHistory from 'helpers/history';
import { Modal } from 'antd';
import styles from './index.less';

function ArticleList({ articleListStore, uiStore }) {
  const createThumbnail = (link) => {
    return (
      <div className={styles.thumbnail} style={{backgroundImage: `url("${link}")`}}></div>
    );
  };
  const handleClick = (key, alpha) => {
    switch (key) {
      case 'edit':
        browserHistory.push({
          pathname: '/article',
          search: `?article_id=${alpha}`
        });
        return;
      case 'delete':
        Modal.confirm({
          title: '删除内容',
          content: '确定删除吗?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            articleListStore.deleteArticle(alpha);
          }
        });
        return;
      default:
        return;
    }
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
            <List.Item actions={[
              <a onClick={handleClick.bind(this, 'edit', item.alpha)}>编辑</a>,
              <a onClick={handleClick.bind(this, 'delete', item.alpha)}>删除</a>]}>
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
