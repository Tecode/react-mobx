import {observable, action} from 'mobx';
import { artifactApi } from 'api';
import uiStore from './ui';


class FontList {
  @observable fontListData = [];
  @observable loading = false;

  @action.bound getListData() {
    this.loading = true;
    artifactApi.getFontListApi({
      index: uiStore.initState.fontList.index,
      size: uiStore.initState.fontList.size
    }).then(action(({data}) => {
      this.loading = false;
      this.fontListData = data.data;
      console.log(data);
    })).catch(action(error => {
      this.loading = false;
      console.log(error);
    }));
  }
}

export default new FontList();
