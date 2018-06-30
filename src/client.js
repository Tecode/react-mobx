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
import * as allStores from 'stores';


combineServerData(allStores, window.__data);
const dest = document.getElementById('content');
// axios配置
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFhOTE2NmQ1ZmNiNDgyOTFhMzZjMWU4Nzg4ZmIyOGE4NTQ4MTcwNTZmOWUyNWQ3MTgwNTVlYTYxYjg0NmM1NDY2Mjg1OGNkMjVlMTQwMDA5In0.eyJhdWQiOiIyIiwianRpIjoiYWE5MTY2ZDVmY2I0ODI5MWEzNmMxZTg3ODhmYjI4YTg1NDgxNzA1NmY5ZTI1ZDcxODA1NWVhNjFiODQ2YzU0NjYyODU4Y2QyNWUxNDAwMDkiLCJpYXQiOjE1MzAyNTUzNjMsIm5iZiI6MTUzMDI1NTM2MywiZXhwIjoxNTYxNzkxMzYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.JCoBO_1rUa36qkE1FMJIkLjYk9HpAP02vEBJurtaapcOO8JG-bA79irLJ3VohxtK_m5Cw1MOHmucMSVkS4GM2ME4rV1EqRhXJiRcoRRv-RSdHlg02N0bZh9CxULIWrpRNBkpFLq8FauRTuvcqHHaHdW8PUuiChsxJ97LeGt_xyGqf76oB5uYJ2YzqxA6btxd7Wm0LHlpYZttoGt_pDju6gsdwruVHMUtJL0WcHUtIAN4KVWybLCXRYKmCHph8gNDcV0m94_FdrqLWfv43VgAIA2_AvV_aYv6mF2CRN_bfc_Sbhfu2shLw_TV0yEM-IbWPB_ueZq-DNDCSyz8StyQMCaXnFAihJ2ocQjdySuOFfW_leENYSIqGQq12GGEHjH4OITkMR-cLPpiwD1cSiw3X4KO5p8RFJm2m2PSr6YtjcYKm97Ci1PQMSO4p7yX0QdRXwkI6Z3zffW_lw6gqr9Rll8t45oe-nBxf-hjd1p9UmplKL8q1wV2_qZBJSs3dwPIlwaXgD-FgX5zP65MXcOPY_xnlGC08qo5VInHtJWrxko9bAJs5J9JLP8Nt7jeGYvT5BdiGuiIV0F-cDT-yxy4dwrNnYpNxhXNRKpk8iWNaZEkK3AGbka39B8kafoWGs4SDOyg09tSRxho8PlGzzfjK-QC3ajcHKo0_dh_5MmkfQs';
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
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </Provider>,
  dest
);
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}
