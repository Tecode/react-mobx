import {observable, action} from 'mobx';
import {articleApi} from 'api';
import uiStore from './ui';

class ArticleList {
  @observable dataList = [];
  @observable loading = true;
  @observable total = 0;

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
  @action.bound resetStore() {
    this.dataList = [];
    this.loading = false;
  }
}
export default new ArticleList();
