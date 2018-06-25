import {observable, action} from 'mobx';

class ArticleStore {
  @observable editorConfig = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    heightMin: 600,
    language: 'zh_cn',
    dragInline: false,
    imageUploadURL: '/upload_image',
    imageMaxSize: 1024 * 1024 * 0.4
  };
  @observable htmlContent = '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n浦发银行(600000) 投资要点 事项</p>';
  @action.bound getHtml() {
    console.log(this.htmlContent);
  }
  @action.bound setValue(key, value) {
    this[key] = value;
  }
}

export default new ArticleStore();
