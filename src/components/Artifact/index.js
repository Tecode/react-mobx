import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Radio from 'antd/lib/radio';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import {toJS} from 'mobx';
import axios from 'axios';
import { parse } from 'query-string';
import {defaultApi} from 'api';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function ArtifactBody({ form, artifactStore }) {
  const { formData } = artifactStore;
  // 设置form表单数据
  const handleFormChange = (key, event) => {
    artifactStore.setValue(key, event.target.value);
    form.setFieldsValue({
      [key]: event.target.value,
    });
  };
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  };
  const checkValid = () => {
    const articleId = parse(location.search).article_id;
    form.validateFields(
      (err) => {
        if (!err) {
          if (artifactStore.isEdit) {
            artifactStore.updateArticle(articleId);
            return;
          }
          artifactStore.saveArtifact();
        }
      },
    );
  };
  const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 6, offset: 6},
  };
  return (
    <Row>
      <Col xs={{span: 4}}>
        <Divider>装逼神器</Divider>
        <ul>
          <li>多个属性请用空格隔开</li>
          <li>示例：center left center</li>
        </ul>
      </Col>
      <Col xs={{span: 10}}>
        <FormItem {...formItemLayout} label="标题">
          {form.getFieldDecorator('title', {
            initialValue: formData.title,
            rules: [{
              required: true,
              message: '文章标题不能为空',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'title')} placeholder="标题"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="装逼文字">
          {form.getFieldDecorator('artifactText', {
            initialValue: formData.artifactText,
            rules: [{
              required: true,
              message: '装逼文字不能为空',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'artifactText')} placeholder="装逼文字"/>
          )}
        </FormItem>
        <FormItem
          label="封面"
          extra="封面图片" {...formItemLayout}>
        <Upload
          name="image"
          fileList={toJS(artifactStore.coverList)}
          headers={{Authorization: axios.defaults.headers.common.Authorization}}
          onChange={artifactStore.coverChange}
          // onRemove={removeFile.bind(null, 'image')}
          action={`${defaultApi.prefix}/uploadimage`}
          accept="image/*"
          listType="picture">
          <Button>
            <Icon type="upload"/> 选择图片
          </Button>
        </Upload>
        </FormItem>
        <FormItem {...formItemLayout} label="字体名称">
          {form.getFieldDecorator('fontName', {
            initialValue: formData.fontName,
            rules: [{
              required: true,
              message: '字体名称不能为空',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'fontName')} placeholder="格式xx.ttf" />
          )}
        </FormItem>
        <FormItem
          label="字体"
          extra="字体文件" {...formItemLayout}>
          <Upload
            name="font"
            fileList={toJS(artifactStore.fileList)}
            headers={{Authorization: axios.defaults.headers.common.Authorization}}
            onChange={artifactStore.fileChange}
            action={`${defaultApi.prefix}/fontupload`}
            listType="picture">
            <Button>
              <Icon type="upload"/> 选择字体
            </Button>
          </Upload>
        </FormItem>
        <FormItem {...formItemLayout} label="字体颜色">
          {form.getFieldDecorator('fontColor', {
            initialValue: formData.fontColor,
            rules: [{
              required: true,
              message: '填写字体颜色',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'fontColor')} placeholder="颜色示例：#4c4c4c" />
          )}
        </FormItem>
        <FormItem
          label="应用图片"
          extra="原图，要处理的图片" {...formItemLayout}>
          <Upload
            name="image"
            fileList={toJS(artifactStore.imageList)}
            headers={{Authorization: axios.defaults.headers.common.Authorization}}
            onChange={artifactStore.imageChange}
            action={`${defaultApi.prefix}/uploadimage`}
            accept="image/*"
            listType="picture">
            <Button>
              <Icon type="upload"/> 选择图片
            </Button>
          </Upload>
        </FormItem>
      </Col>
      <Col xs={{span: 10}}>
        <FormItem {...formItemLayout} label="是否有日期">
          <RadioGroup disabled={artifactStore.isEdit} onChange={(event) => {
            artifactStore.setValue('date', event.target.value);
          }} value={formData.date}>
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="字体大小">
          {form.getFieldDecorator('fontSize', {
            initialValue: formData.fontSize,
            rules: [{
              required: true,
              message: '字体大小不能为空',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'title')} placeholder="格式：24" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="垂直对齐">
          {form.getFieldDecorator('vertical', {
            initialValue: formData.vertical,
            rules: [{
              required: true,
              message: '垂直对齐请填写',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'vertical')} placeholder="left, right, center" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="水平对齐">
          {form.getFieldDecorator('horizontal', {
            initialValue: formData.horizontal,
            rules: [{
              required: true,
              message: '水平对齐方式',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'horizontal')} placeholder="left, right and center" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="X轴数值">
          {form.getFieldDecorator('xAxis', {
            initialValue: formData.xAxis,
            rules: [{
              required: true,
              message: 'x轴数值',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'xAxis')} placeholder="Number：50" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Y轴数值">
          {form.getFieldDecorator('yAxis', {
            initialValue: formData.yAxis,
            rules: [{
              required: true,
              message: 'y轴数值',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'yAxis')} placeholder="Number：50" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="旋转角度">
          {form.getFieldDecorator('rotation', {
            initialValue: formData.rotation,
            rules: [{
              required: true,
              message: '旋转角度请填写',
            }],
          })(
            <Input onChange={handleFormChange.bind(this, 'rotation')} placeholder="Number：-360~360" />
          )}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button
            type="primary"
            onClick={checkValid}
            loading={artifactStore.sumbmitLoading}>
            保存
          </Button>
        </FormItem>
      </Col>
    </Row>
  );
}

ArtifactBody.propTypes = {
  articleStore: PropTypes.object
};
export default Form.create()(inject('artifactStore')(observer(ArtifactBody)));
