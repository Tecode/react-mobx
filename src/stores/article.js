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
  // 对文件定义
  @observable fileList = [
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/xxx.png',
    // }
  ];
  // 文件是自己上传还是填写链接
  @observable fileDowload = 'link';
  // 对图片上传定义
  @observable imageList = [];
  // 文章类型是ppt还是其他的
  @observable typeValue = 'article';
  // 编辑器内容
  @observable htmlContent = '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n浦发银行(600000) 投资要点 事项</p>';
  @action.bound getHtml() {
    console.log(this.htmlContent);
  }
  @action.bound handleChange(info) {
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    // 如果是ppt可以选择多张图片
    if (this.typeValue === 'article') {
      fileList = fileList.slice(-1);
    }

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    // fileList = fileList.filter((file) => {
    //   if (file.response) {
    //     return file.status === 'success';
    //   }
    //   return true;
    // });
    this.imageList = fileList;
  }
  @action.bound fileChange(info) {
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    // 如果是ppt可以选择多张图片
    if (this.typeValue === 'article') {
      fileList = fileList.slice(-1);
    }

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    // fileList = fileList.filter((file) => {
    //   if (file.response) {
    //     return file.status === 'success';
    //   }
    //   return true;
    // });
    this.fileList = fileList;
  }
  @action.bound setValue(key, value) {
    this[key] = value;
  }
}

export default new ArticleStore();
