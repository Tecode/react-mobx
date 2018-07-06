import React from 'react';
import { observer, inject } from 'mobx-react';
import Highlight from 'react-highlight.js';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.less';

const { TextArea } = Input;

function InputCodeContent({codeStore}) {
  const refs = React.createRef();
  const handleCopy = () => {
    codeStore.setValue('htmlCode', refs.current.innerHTML);
    message.success('复制成功');
  };
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
      <CopyToClipboard onCopy={handleCopy} text={codeStore.htmlCode}>
        <Button type="primary" className={styles.button}>一键复制</Button>
      </CopyToClipboard>
      <div ref={refs}>
        <Highlight language={codeStore.language}>
          {codeStore.content}
        </Highlight>
      </div>
    </div>
  );
}

export default inject('codeStore')(observer(InputCodeContent));
