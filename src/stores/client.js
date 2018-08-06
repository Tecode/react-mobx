import {observable, action} from 'mobx';
import pathval from 'pathval';

class ClientStore {
  @observable userInfo = {};

  @action.bound setValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound combineServerData(data) {
    this.userInfo = data.userInfo;
  }

}
export default new ClientStore();
