import {observable, action} from 'mobx';
import { artifactApi } from 'api';
import uiStore from './ui';


class FontList {
  @observable fontListData = [];
  @observable loading = false;
  @observable total = 0;

  @action.bound getListData() {
    this.loading = true;
    artifactApi.getFontListApi({
      index: uiStore.initState.fontList.index,
      size: uiStore.initState.fontList.size
    }).then(action(({data}) => {
      this.loading = false;
      this.fontListData = data.data;
      this.total = data.totall;
      console.log(data);
    })).catch(action(error => {
      this.loading = false;
      console.log(error);
    }));
  }
  @action.bound resetStore() {
    this.fontListData = [];
    this.loading = false;
    this.total = 0;
  }
}

export default new FontList();
