/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import axios from 'axios';
// import Uuid from 'node-uuid';
import { Provider } from 'mobx-react';
import combineServerData from 'helpers/combineServerData';
import * as allStores from 'stores';


combineServerData(allStores, window.__data);
const dest = document.getElementById('content');
// axios配置
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMjAxOCIsInVuaXF1ZV9uYW1lIjoiMjAxOCIsInVzZXJpZCI6IjIwMTgiLCJpc3MiOiJyZXN0YXBpdXNlciIsImF1ZCI6IjA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2IiwiZXhwIjoxNTI2OTYwNjEzLCJuYmYiOjE1MjY3ODc4MTN9.NhRUDwOLxuLLgUiAcR9cjZlqaeqGLNKnfqDGc0_dUZU';
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

// axios.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   // Do something with request error
//   console.log('error', error);
//   if (axios.isCancel(error)) {
//     return Promise.reject(error);
//   }
//   return Promise.reject(error);
// });
ReactDOM.hydrate(
  <Provider {...allStores}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  dest
);
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}
