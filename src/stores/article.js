import {observable, action, toJS} from 'mobx';
import { articleApi } from 'api';
import { message } from 'antd';
import browserHistory from 'helpers/history';

class ArticleStore {
  @observable editorConfig = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    heightMin: 600,
    language: 'zh_cn',
    dragInline: false,
    imageUploadURL: '/upload_image',
    imageUploadRemoteUrls: true,
    imageMaxSize: 1024 * 1024 * 0.4
  };
  // 文章id
  @observable article_id = '';
  // 文章内容字段
  @observable inputVisible = false;
  @observable tags = [];
  @observable inputValue = '';
  @observable title = '';
  @observable description = '';
  @observable requestLoading = false;
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
  // 文件链接地址
  @observable link = '';
  // 对图片上传定义
  @observable imageList = [];
  // 文章类型是ppt还是其他的
  @observable typeValue = 'article';
  // 编辑器内容
  @observable htmlContent = '';
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
    // 只能上传一个文件
    fileList = fileList.slice(-1);

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
  // 验证输入的内容
  @action.bound validate() {
    if (this.tags.length < 1) {
      message.error('标签说明不能为空！');
      return false;
    }
    if (this.imageList.length < 1) {
      message.error('图片未上传！');
      return false;
    }
    if (this.fileDowload === 'upload' && this.fileList.length < 1) {
      message.error('文件未上传！');
      return false;
    }
    if (this.htmlContent.length < 5) {
      message.error('文章最少4个字符！');
      return false;
    }
    return true;
  }
  // 保存编辑的内容
  @action.bound saveArticle() {
    if (this.validate()) {
      this.requestLoading = true;
      articleApi.addNewArticleApi({
        params: {
          title: this.title,
          description: this.description,
          link: this.link,
          tags: this.tags.join(','),
          file: toJS(this.fileList)[0] && toJS(this.fileList)[0].url,
          images: toJS(this.imageList).map(item => item.url).join(','),
          fileDowload: this.fileDowload,
          htmlContent: this.htmlContent,
          typeValue: this.typeValue,
        }
      }).then(action(({data}) => {
        message.success(data.message);
        browserHistory.push({
          pathname: '/article',
          search: `?article_id=${data.article_id}`
        });
        this.requestLoading = false;
      })).catch(action(error => {
        message.error(error.response.data.error);
        this.requestLoading = false;
      }));
    }
  }
  // 获取内容信息
  @action.bound getArticleData() {
    console.log(4);
  }
  @action.bound setValue(key, value) {
    this[key] = value;
  }
  @action.bound resetStore() {
    this.inputVisible = false;
    this.tags = [];
    this.inputValue = '';
    this.title = '';
    this.description = '';
    this.requestLoading = false;
      // 对文件定义
    this.fileList = [];
      // 文件是自己上传还是填写链接
    this.fileDowload = 'link';
      // 文件链接地址
    this.link = '';
      // 对图片上传定义
    this.imageList = [];
      // 文章类型是ppt还是其他的
    this.typeValue = 'article';
      // 编辑器内容
    this.htmlContent = '';
    this.article_id = '';
  }
}

export default new ArticleStore();
