import React from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import BraftEditor from 'components/FroalaEditor';
import LeftContent from './LeftContent';
import styles from './index.less';

const editorRef = React.createRef();

function ArticleContent({articleStore}) {
  const {TextArea} = Input;
  const handleChange = (content) => {
    articleStore.setValue('htmlContent', content);
  };
  // const handleRawChange = (rawContent) => {
  //   console.log(rawContent);
  // };
  console.log(articleStore.htmlContent);
  const editorProps = {
    height: 550,
    contentFormat: 'html',
    initialContent: articleStore.htmlContent,
    onChange: handleChange,
    // onRawChange: handleRawChange
  };
  const media = {
    allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
    image: true, // 开启图片插入功能
    video: true, // 开启视频插入功能
    audio: true, // 开启音频插入功能
    validateFn: (file) => file.size < 1024 * 500, // 指定本地校验函数，说明见下文
    uploadFn: (param) => {
      const serverURL = '/upload_image';
      const xhr = new XMLHttpRequest;
      const fd = new FormData();

      // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
      // console.log(param.libraryId);

      const successFn = () => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
          url: JSON.parse(xhr.response).link,
          meta: {
            id: '002',
            title: '视频',
            alt: '视频',
            loop: true, // 指定音视频是否循环播放
            autoPlay: true, // 指定音视频是否自动播放
            controls: true, // 指定音视频是否显示控制栏
            poster: 'https://www.soscoon.com/storage/images/MaKw5zcSiStSBMwdh6Bx9rJnqCqyy3yG.jpeg', // 指定视频播放器的封面
          }
        });
      };

      const progressFn = (event) => {
        // 上传进度发生变化时调用param.progress
        param.progress(event.loaded / event.total * 100);
      };

      const errorFn = () => {
        // 上传发生错误时调用param.error
        param.error({
          msg: 'unable to upload.'
        });
      };
      xhr.upload.addEventListener('progress', progressFn, false);
      xhr.addEventListener('load', successFn, false);
      xhr.addEventListener('error', errorFn, false);
      xhr.addEventListener('abort', errorFn, false);

      fd.append('file', param.file);
      xhr.open('POST', serverURL, true);
      xhr.send(fd);
    }, // 指定上传函数，说明见下文
    removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
    onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
    onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
    onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
  };
  // const insertExternal = () => {
  //   editorRef.current.insertHTML(articleStore.insertContent);
  //   articleStore.setValue('insertContent', '');
  // };
  const extendControls = [
    {
      type: 'split',
    }, {
      type: 'modal',
      text: '预览',
      className: 'modal-button',
      onClick: () => {
        window.open('', '预览').document.write(
          `<div style="
            width: 800px;
            padding: 10px;
            height: 100%;
            margin: 0 auto;
            border: 1px solid #dedede">
          ${articleStore.htmlContent}
          </div>`
        );
      },
      // modal: {
      //   id: 'external-image-modal',
      //   className: 'external-image-modal',
      //   title: '插入代码',
      //   showClose: true,
      //   showCancel: true,
      //   showConfirm: true,
      //   confirmable: articleStore.insertContent,
      //   confirmText: '插入',
      //   onConfirm: insertExternal,
      //   children: (
      //     <div className={styles.textareaBox}>
      //       <TextArea onChange={(event) => {articleStore.setValue('insertContent', event.target.value.trim());}} />
      //     </div>
      //   )
      // }
    }
  ];
  return (
    <Row>
      <Col xs={{span: 5}}>
        <LeftContent />
      </Col>
      {/*有服务端渲染，编辑器不支持服务端渲染要判断一下*/}
      <Col xs={{span: 18, offset: 1}} className={styles.boder}>
        {
          __SERVER__ ? null :
            <BraftEditor
              {...editorProps}
              ref={editorRef}
              extendControls={extendControls}
              media={media}
              contentId={articleStore.article_id}
            />
        }
      </Col>
    </Row>
  );
}
ArticleContent.propTypes = {
  articleStore: PropTypes.object
};
export default inject('articleStore')(observer(ArticleContent));
