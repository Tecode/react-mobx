/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Routes from './routes';
import axios from 'axios';
// import Uuid from 'node-uuid';
import { Provider } from 'mobx-react';
import combineServerData from 'helpers/combineServerData';
import browserHistory from 'helpers/history';
import { get } from 'js-cookie';
import * as allStores from 'stores';
import { notification, Button } from 'antd';


combineServerData(allStores, window.__data);
const dest = document.getElementById('content');
// axios配置
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common.Authorization = `Bearer ${get('remote_token')}`;
// 拦截请求
// axios.interceptors.request.use((axiosConfig) => {
//   // Do something before request is sent
//   axiosConfig.headers['sc-id'] = `web-${Uuid.v4()}`;
//   axiosConfig.headers['Cache-Control'] = 'no-cache';
//   if (!axiosConfig.params) {
//     axiosConfig.params = {
//       timestamp: new Date().getTime()
//     };
//   } else {
//     axiosConfig.params.timestamp = new Date().getTime();
//   }
//   return axiosConfig;
// }, (error) => {
//   console.log('request error', error);
// });

axios.interceptors.response.use((response) => {
  console.log(response, '-------------response');
  return response;
}, (error) => {
  // Do something with request error
  console.log('error------', error.response.data.code);
  if (error.response.data.code === '401') {
    const btn = (
      <Button type="primary" size="small" onClick={() => window.location.href = '/login'}>
        登录
      </Button>
    );
    notification.error({
      message: '认证失败',
      description: 'Token认证失败,请重新登录.',
      duration: null,
      btn
    });
  }
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  return Promise.reject(error);
});
ReactDOM.hydrate(
  <Provider {...allStores}>
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </Provider>,
  dest
);
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}
