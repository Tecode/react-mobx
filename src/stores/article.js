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
  // 文章标签
  @observable inputVisible = false;
  @observable tags = [];
  @observable inputValue = '';
  @observable fileList = [
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/xxx.png',
    // }
  ];
  // 文章类型是ppt还是其他的
  @observable typeValue = 'article';
  // 文件上传
  @action.bound handleChange(info) {
    let fileList = info.fileList;
    fileList = fileList.slice(-2);

    console.log(fileList, '-------------------fileList111');
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.status === 'success';
      }
      return file;
    });
    console.log(fileList, '-------------------fileList22');
    this.fileList = fileList;
  }
  // 编辑器内容
  @observable htmlContent = '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n浦发银行(600000) 投资要点 事项</p>';
  @action.bound getHtml() {
    console.log(this.htmlContent);
  }
  @action.bound setValue(key, value) {
    this[key] = value;
  }
}

export default new ArticleStore();
