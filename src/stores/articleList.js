import {observable, action} from 'mobx';
import { articleApi } from 'api';
import { message } from 'antd';
import uiStore from './ui';

class ArticleList {
  @observable dataList = [];
  @observable loading = true;
  @observable total = 0;
  @observable deleteLoading = false;

  @action.bound getListData() {
    this.loading = true;
    articleApi.getArticleListApi({
      index: uiStore.initState.articleList.index,
      size: uiStore.initState.articleList.size
    }).then(action(({data}) => {
      this.loading = false;
      this.dataList = data.data;
      this.total = data.total;
      console.log(data.data);
    })).catch(error => {
      console.log(error);
      this.loading = false;
    });
  }
  @action.bound deleteArticle(articleId) {
    this.deleteLoading = true;
    articleApi.deleteArticleApi({ articleId }).then(action(({data}) => {
      this.deleteLoading = false;
      uiStore.initState.articleList.index = 1;
      this.getListData();
      message.success(data.message);
      console.log(data);
    })).catch(action(error => {
      message.error(error.response.data.error);
      this.deleteLoading = false;
    }));
  }
  @action.bound resetStore() {
    this.dataList = [];
    this.loading = false;
    this.deleteLoading = false;
  }
}
export default new ArticleList();
