import {observable, action} from 'mobx';
import pathval from 'pathval';
class CodeStore {
  @observable content = '';
  @observable language = 'bash';
  @observable htmlCode = '';

  @action.bound setValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
}
export default new CodeStore();
