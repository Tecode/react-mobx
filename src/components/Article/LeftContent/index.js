import React from 'react';
import { observer, inject } from 'mobx-react';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import Tag from 'antd/lib/tag';
import Tooltip from 'antd/lib/tooltip';
import Radio from 'antd/lib/radio';
import { toJS } from 'mobx';
import { defaultApi } from 'api';
import styles from './index.less';


const { TextArea } = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function LeftContent({form, articleStore}) {
  const {
    tags,
    inputVisible,
    inputValue,
    setValue,
    getHtml,
    handleChange,
    fileList,
    typeValue
  } = articleStore;
  const discription = () => {
    return ([
      '图片上传支持png,gif,jpeg,pjpeg,大小不能超过400kb.'
    ].map((value, key) => <li key={key}>{value}</li>));
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 6, offset: 6 },
  };
  const checkValid = () => {
    form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
          getHtml();
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
    setTimeout(()=> {
      document.getElementById('inputRef').focus();
    });
  };
  const onChange = (event) => {
    setValue('typeValue', event.target.value);
  };
  return (
    <div className={styles.LeftContent}>
      <FormItem {...formItemLayout} label="标题">
        {form.getFieldDecorator('title', {
          rules: [{
            required: true,
            message: '文章标题不能为空',
          }],
        })(
          <Input placeholder="文章标题" />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('description', {
          rules: [{
            required: true,
            message: '描述信息不能为空',
          }],
        })(
          <TextArea placeholder="描述信息" />
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
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={showInput}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="plus" /> 新标签
            </Tag>
          )}
        </React.Fragment>
      </FormItem>
      <FormItem {...formItemLayout} label="类型">
        <RadioGroup onChange={onChange} value={typeValue}>
          <Radio value="article">文章</Radio>
          <Radio value="ppt">ppt</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="封面"
        extra="封面图片"
      >
          <Upload
            fileList={toJS(fileList)}
            onChange={handleChange}
            multiple={typeValue === 'ppt'}
            action={`${defaultApi.prefix}/uploadimage`}
            supportServerRender
            listType="picture">
            <Button>
              <Icon type="upload" /> 选择图片
            </Button>
          </Upload>
      </FormItem>
      <FormItem {...formTailLayout}>
        <Button
          type="primary"
          onClick={checkValid}
          loading={false}>
          发布
        </Button>
      </FormItem>
      <Divider>说明</Divider>
      <ul>
        { discription() }
      </ul>
    </div>
  );
}

export default Form.create()(inject('articleStore')(observer(LeftContent)));
