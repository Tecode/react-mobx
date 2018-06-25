import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import HomeBody from 'components/homePage';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import FroalaEditor from 'components/FroalaEditor';

@observer
export default class HomePage extends Component {
  render() {
    return (
      <FroalaEditor
        tag="textarea"
      />
    );
  }
}
