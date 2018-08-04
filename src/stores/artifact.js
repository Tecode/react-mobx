import {observable, action, runInAction } from 'mobx';
import { artifactApi, defaultApi } from 'api';
import { message } from 'antd';

class Artifact {
  @observable sumbmitLoading = false;
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
    title: '3',
    artifactText: '4455 5887',
    fontName: 'gh.ttf',
    fontColor: '#fff',
    date: '0',
    fontSize: '12',
    vertical: 'top',
    horizontal: 'left',
    rotation: '-32',
    xAxis: '60',
    yAxis: '50',
  };
  @action.bound setValue(key, value) {
    this.formData[key] = value;
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
  @action.bound addNewArtifact() {
    if (this.validate()) {
      this.sumbmitLoading = true;
      artifactApi.addNewArtifactApi({params: this.formData}).then(action(resp => {
        console.log(resp);
        this.sumbmitLoading = false;
      })).catch(action(err => {
        console.log(err);
        this.sumbmitLoading = false;
      }));
    }
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
          this.formData.uploadFont = file.response.fontName;
          this.formData.fontLocalName = file.response.localName;
          this.formData.fontName = `${this.formData.fontName} ${file.response.fontName}`;
        });
        file.url = defaultApi.rearEndfontUrl + file.response.url;
      }
      return file;
    });
    this.fileList = fileList;
  }
}

export default new Artifact();
