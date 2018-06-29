import React from 'react';
import {observer, inject} from 'mobx-react';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import Radio from 'antd/lib/radio';
import { defaultApi } from 'api';
import {toJS} from 'mobx';
import styles from './index.less';
import axios from 'axios';


const {TextArea} = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function LeftContent({form, articleStore}) {
  const {
    tags,
    inputVisible,
    inputValue,
    setValue,
    saveArticle,
    fileList,
    handleChange,
    fileChange,
    imageList,
    fileDowload,
    link,
    title,
    description,
    requestLoading,
    typeValue
  } = articleStore;
  const descriptionFun = () => {
    return ([
      '图片上传支持png,gif,jpeg,pjpeg,大小不能超过400kb.',
      '文章只允许上传一张图片，PPT可以上传多张图片',
      '文件上传支持IE10以上浏览器'
    ].map((value, key) => <li key={key}>{value}</li>));
  };
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  };
  const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 6, offset: 6},
  };
  const checkValid = () => {
    form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
          saveArticle();
        }
      },
    );
  };
  const handleInputConfirm = () => {
    let newTags = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    setValue('inputVisible', false);
    setValue('inputValue', '');
    setValue('tags', newTags);
  };
  const handleClose = (removedTag) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setValue('tags', newTags);
  };
  const handleInputChange = (event) => {
    setValue('inputValue', event.target.value);
  };
  const showInput = () => {
    setValue('inputVisible', true);
    setTimeout(() => {
      document.getElementById('inputRef').focus();
    });
  };
  const onChange = (event) => {
    setValue('typeValue', event.target.value);
  };
  const typeChange = (event) => {
    setValue('fileDowload', event.target.value);
  };
  // 设置form表单数据
  const handleFormChange = (key, event) => {
    setValue(key, event.target.value);
    form.setFieldsValue({
      [key]: event.target.value,
    });
  };
  // 显示上传文件还是填写链接
  const moduleDisplay = () => {
    if (fileDowload === 'link') {
      return (
        <FormItem {...formItemLayout} label="链接地址">
          {form.getFieldDecorator('link', {
            initialValue: link,
            rules: [{
              required: true,
              message: '链接地址不能为空',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'link')} placeholder="链接地址"/>
          )}
        </FormItem>
      );
    }
    return (
      <FormItem
        {...formItemLayout}
        label="压缩文件"
        extra="上传压缩文件"
      >
        <Upload
          fileList={toJS(fileList)}
          onChange={fileChange}
          action={`${defaultApi.prefix}/uploadfile`}
          headers={{Authorization: axios.defaults.headers.common.Authorization}}
          listType="picture">
          <Button>
            <Icon type="upload"/> 选择文件
          </Button>
        </Upload>
      </FormItem>
    );
  };
  return (
    <div className={styles.LeftContent}>
      <FormItem {...formItemLayout} label="标题">
        {form.getFieldDecorator('title', {
          initialValue: title,
          rules: [{
            required: true,
            message: '文章标题不能为空',
          }],
        })(
          <Input onChange={handleFormChange.bind(this, 'title')} placeholder="文章标题"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('description', {
          initialValue: description,
          rules: [{
            required: true,
            message: '描述信息不能为空',
          }],
        })(
          <TextArea onChange={handleFormChange.bind(this, 'description')} placeholder="描述信息"/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="标签">
        <React.Fragment>
          {tags.map((tag) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} closable afterClose={handleClose.bind(null, tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <Input
              id="inputRef"
              type="text"
              size="small"
              style={{width: 78}}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={showInput}
              style={{background: '#fff', borderStyle: 'dashed'}}
            >
              <Icon type="plus"/> 新标签
            </Tag>
          )}
        </React.Fragment>
      </FormItem>
      <FormItem {...formItemLayout} label="类型">
        <RadioGroup onChange={onChange} value={typeValue}>
          <Radio value="article">文章</Radio>
          <Radio value="ppt">PPT</Radio>
          <Radio value="html">HTML模板</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={typeValue === 'article' ? '封面' : 'PPT图片'}
        extra={typeValue === 'article' ? '封面图片只能选取一张' : 'PPT图片可以选择多张'}
      >
        <Upload
          name="image"
          fileList={toJS(imageList)}
          headers={{Authorization: axios.defaults.headers.common.Authorization}}
          onChange={handleChange}
          multiple={typeValue === 'ppt'}
          action={`${defaultApi.prefix}/uploadimage`}
          accept="image/*"
          listType="picture">
          <Button>
            <Icon type="upload"/> 选择图片
          </Button>
        </Upload>
      </FormItem>
      {
        typeValue === 'ppt' || typeValue === 'html' ?
          <React.Fragment>
            <FormItem {...formItemLayout} label="下载方式">
              <RadioGroup onChange={typeChange} value={fileDowload}>
                <Radio value="link">填写链接</Radio>
                <Radio value="upload">上传文件</Radio>
              </RadioGroup>
            </FormItem>
            { moduleDisplay() }
          </React.Fragment> : null
      }
      <FormItem {...formTailLayout}>
        <Button
          type="primary"
          onClick={checkValid}
          loading={requestLoading}>
          发布
        </Button>
      </FormItem>
      <Divider>说明</Divider>
      <ul>
        { descriptionFun() }
      </ul>
    </div>
  );
}

export default Form.create()(inject('articleStore')(observer(LeftContent)));
