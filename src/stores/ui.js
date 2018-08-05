import {observable, action, reaction} from 'mobx';
import articleListStore from './articleList';
import artiFactListStore from './artifactList';
import fontListStore from './fontList';

class UiStore {
  constructor() {
    reaction(
      () => this.initState.articleList.index,
      () => {
        articleListStore.getListData();
      }
    );
    reaction(
      () => this.initState.artifactList.index,
      () => {
        artiFactListStore.getListData();
      }
    );
    reaction(
      () => this.initState.fontList.index,
      () => {
        fontListStore.getListData();
      }
    );
  }
  @observable initState = {
    articleList: {
      index: 1,
      size: 10,
    },
    artifactList: {
      index: 1,
      size: 10,
    },
    fontList: {
      index: 1,
      size: 10,
    }
  };
  @action.bound resetStore() {
    this.initState = {
      articleList: {
        index: 1,
        size: 10,
      },
      artifactList: {
        index: 1,
        size: 10,
      },
      fontList: {
        index: 1,
        size: 10,
      },
    };
  }
}
export default new UiStore();
