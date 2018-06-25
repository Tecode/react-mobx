import {observable} from 'mobx';

class ArticleStore {
  @observable editorConfig = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    heightMin: 600,
    language: 'zh_cn'
  }
}

export default new ArticleStore();
