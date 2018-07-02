import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import CryptoJS from 'crypto-js';
import { set } from 'js-cookie';
import { message } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
import styles from './index.less';

class LoginForm extends Component {
  static propTypes = {
    form: PropTypes.object
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
        const iv = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');
        const encrypted = CryptoJS.AES.encrypt(values.password, key, { iv: iv });
        const passwordBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
        axios.post('/api/login', {
          email: values.email,
          remember: values.remember,
          password: passwordBase64
        }).then(({data}) => {
          set('remote_token', data.token, { expires: 7 });
          window.location.href = '/home';
        }).catch((error) => {
          message.error(error.response.data.error);
        });
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.form_box}>
        <div className={styles.logo}></div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '邮箱格式错误!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住我</Checkbox>)}
            {/*<a className="login-form-forgot" href="">*/}
              {/*Forgot password*/}
            {/*</a>*/}
            <Button type="primary" htmlType="submit" className={styles.login_form_button}>
              登录
            </Button>
            或 <a href="http://www.soscoon.com">注册!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
