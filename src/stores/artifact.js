import {observable, action, runInAction} from 'mobx';
import {artifactApi, defaultApi} from 'api';
import {message} from 'antd';

class Artifact {
  @observable sumbmitLoading = false;
  @observable artifactId = '';
  @observable isEdit = false;
  // 封面
  @observable coverList = [];
  // 图片
  @observable imageList = [];
  // ziti
  @observable fileList = [];
  // 参数
  @observable formData = {
    cover: '',
    fontLocalName: '',
    image: '',
    uploadFont: '',
    title: '',
    artifactText: '',
    fontName: '',
    fontColor: '',
    date: '',
    fontSize: '',
    vertical: '',
    horizontal: '',
    rotation: '',
    xAxis: '',
    yAxis: '',
    autoText: '',
    fontImage: ''
  };

  @action.bound setValue(key, value) {
    this.formData[key] = value;
  }

  @action.bound setNormalValue(key, value) {
    this[key] = value;
  }

  // 验证输入的内容
  @action.bound validate() {
    if (this.imageList.length < 1) {
      message.error('图片未上传！');
      return false;
    }
    if (this.coverList.length < 1) {
      message.error('图片未上传！');
      return false;
    }
    return true;
  }

  @action.bound saveArtifact() {
    this.addNewArtifact();
  }

  // 更新内容
  @action.bound updateArtifact(artifactId) {
    if (this.validate()) {
      this.requestLoading = true;
      artifactApi.editArtifactApi({
        artifactId,
        params: this.formData,
      }).then(action(({data}) => {
        message.success(data.message);
        this.requestLoading = false;
      })).catch(action((error) => {
        message.error(error.response.data.error);
        this.requestLoading = false;
      }));
    }
  }

  @action.bound addNewArtifact() {
    if (this.validate()) {
      this.sumbmitLoading = true;
      artifactApi.addNewArtifactApi({params: this.formData}).then(action(({data}) => {
        console.log(data);
        message.success(data.message);
        this.sumbmitLoading = false;
      })).catch(action(error => {
        console.log(error);
        message.error(error.response.data.error);
        // browserHistory.push({
        //   pathname: '/article_list',
        //   search: `?article_list=${data.article_id}`
        // });
        this.sumbmitLoading = false;
      }));
    }
  }

  // 获取内容信息
  @action.bound getArticleData(artifactId) {
    artifactApi.getArtifactApi({artifactId}).then(action(({data}) => {
      // 填充数据
      this.formData = data.data;
      if (data.data.fontLocalName) {
        this.fileList = [
          {
            uid: '51024',
            name: data.data.fontLocalName,
            status: 'done',
            url: `${defaultApi.rearEndfontUrl}${data.data.fontImage}`,
          }
        ];
      }
      this.imageList = [
        {
          uid: '10377',
          name: data.data.image,
          status: 'done',
          url: `${defaultApi.rearEndImageUrl}${data.data.image}`,
        }
      ];
      this.coverList = [
        {
          uid: '10377',
          name: data.data.cover,
          status: 'done',
          url: `${defaultApi.rearEndImageUrl}${data.data.cover}`,
        }
      ];
    })).catch(() => {
      console.log('出错了');
    });
  }

  @action.bound coverChange(info) {
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    fileList = fileList.slice(-1);
    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        this.formData.cover = file.response.url;
        // Component will show file.url as link
        file.url = defaultApi.rearEndImageUrl + file.response.url;
      }
      return file;
    });
    this.coverList = fileList;
  }

  @action.bound imageChange(info) {
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    fileList = fileList.slice(-1);
    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        this.formData.image = file.response.url;
        // Component will show file.url as link
        file.url = defaultApi.rearEndImageUrl + file.response.url;
      }
      return file;
    });
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
        runInAction('insertData', () => {
          this.formData.fontImage = file.response.url;
        });
        file.url = defaultApi.rearEndfontUrl + file.response.url;
      }
      return file;
    });
    this.fileList = fileList;
  }

  @action.bound resetStore() {
    this.sumbmitLoading = false;
    this.artifactId = '';
    this.isEdit = false;
    // 封面
    this.coverList = [];
    // 图片
    this.imageList = [];
    // ziti
    this.fileList = [];
    // 参数
    this.formData = {
      cover: '',
      fontLocalName: '',
      image: '',
      uploadFont: '',
      title: '',
      artifactText: '',
      fontName: '',
      fontColor: '',
      date: '',
      fontSize: '',
      vertical: '',
      horizontal: '',
      rotation: '',
      xAxis: '',
      yAxis: '',
      autoText: '',
      fontImage: ''
    };
  }
}

export default new Artifact();
