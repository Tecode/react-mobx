import {observable, action, reaction} from 'mobx';
import articleListStore from './articleList';

class UiStore {
  constructor() {
    reaction(
      () => this.initState.articleList.index,
      () => {
        articleListStore.getListData();
      }
    );
  }
  @observable initState = {
    articleList: {
      index: 1,
      size: 5,
    }
  };
  @action.bound resetStore() {
    this.initState = {
      articleList: {
        index: 1,
        size: 5,
      }
    };
  }
}
export default new UiStore();
