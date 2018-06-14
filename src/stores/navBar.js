import {observable, action} from 'mobx';
import pathval from 'pathval';
class NavBarStore {
  @observable config = [
    {
      text: '客户画像',
      module: '客户画像',
      usable: true,
    },
    {
      text: '客户管理',
      module: '客户管理',
      usable: true,
    },
    {
      text: '产品配置',
      module: '产品配置',
      usable: true,
    },
    {
      text: '账号管理',
      module: '账号管理',
      usable: true,
    },
  ];
  @observable activeModule = '客户画像';

  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
}
export default new NavBarStore();
