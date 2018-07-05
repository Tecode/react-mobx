import React from 'react';
import { observer, inject } from 'mobx-react';
import Highlight from 'react-highlight.js';
import Input from 'antd/lib/input';
import styles from './index.less';

const { TextArea } = Input;

function InputCodeContent({codeStore}) {
  return (
    <div className={styles.box}>
      <h3>代码语言</h3>
      <Input onChange={(event) => {
        codeStore.setValue('language', event.target.value);
      }} value={codeStore.language} />
      <h3>代码</h3>
      <TextArea onChange={(event) => {
        codeStore.setValue('content', event.target.value);
      }} vlue={codeStore.content} />
      <Highlight language={codeStore.language}>
        {codeStore.content}
      </Highlight>
    </div>
  );
}

export default inject('codeStore')(observer(InputCodeContent));
