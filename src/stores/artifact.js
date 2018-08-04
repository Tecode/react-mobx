import {observable, action } from 'mobx';
import { artifactApi } from 'api';

class Artifact {
  @observable sumbmitLoading = false;
  @observable isEdit = false;
  // 参数
  @observable formData = {
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
    console.log(this[key], '----------');
    this[key] = value;
  }
  @action.bound addNewArtifact() {
    this.sumbmitLoading = true;
    artifactApi.addNewArtifactApi({params: this.formData}).then(action(resp => {
      console.log(resp);
      this.sumbmitLoading = false;
    })).catch(action(err => {
      console.log(err);
      this.sumbmitLoading = false;
    }));
  }
  @action.bound saveArtifact() {
    console.log(this.formData);
  }
}

export default new Artifact();
