import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
// import PrettyError from 'pretty-error';
import http from 'http';
import axios from 'axios';
import url from 'url';
import logger from 'morgan';
import { StaticRouter } from 'react-router';
import { Provider, useStaticRendering } from 'mobx-react';
import Routes from './routes';
import * as allStores from 'stores';
import { parseUrl } from 'query-string';

useStaticRendering(true);
axios.defaults.headers.common['Content-Type'] = 'application/json';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon1.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(logger('dev'));
app.get('*', (req, res) => {
  axios.defaults.headers.common['scm-token'] = req.cookies['scm-token'] || {};
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  console.log('路由被match', url.parse(req.url));
  /*服务端注入RouterStore*/
  const context = {};
  allStores.location = {
    pathname: url.parse(req.url).pathname,
    query: parseUrl(req.url).query
  };
  const component = (
    <Provider {...allStores}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
  res.status(200);
  global.navigator = { userAgent: req.headers['user-agent'] };
  res.send('<!doctype html>\n' +
    '<!-- Polyfills -->\n' +
    '<!--[if lt IE 10]>\n' +
    '<script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>\n' +
    '<script src="https://raw.githubusercontent.com/inexorabletash/polyfill/master/typedarray.js"></script>\n' +
    '<![endif]-->\n' +
    '<!--[if lte IE 11]>\n' +
    '<script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>\n' +
    '<![endif]-->\n' +
    renderToString(<Html reqUrlObj={url.parse(req.url, true)} isDev={__DEVELOPMENT__}
      assets={webpackIsomorphicTools.assets()}
      component={component} {...allStores} />));
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
