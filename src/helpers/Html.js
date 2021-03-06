import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
// import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import {toJS} from 'mobx';
/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    isDev: PropTypes.bool,
    reqUrlObj: PropTypes.object,
  };

  prepareStore(allStore) {
    const keyArr = Object.keys(allStore);
    const output = {};
    keyArr.map((key) => {
      output[key] = toJS(allStore[key]);
    });
    return output;
  }

  isFirstLoad() {
    return this.props.reqUrlObj.pathname === '/';
  }

  render() {
    const {assets, component, ...allStore} = this.props;
    const stores = this.prepareStore(allStore);
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    return (
      <html lang="en-us">
      <head>
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <title>乐游网站后台管理系统</title>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="content-type" content="text/html;charset=utf-8"/>
        {/* styles (will be present only in production with webpack extract text plugin) */}

        <link href="../vendors/css/font-awesome.css"
              rel="stylesheet" type="text/css" charSet="UTF-8"/>
        <link href="../vendors/css/antd.css"
              rel="stylesheet" type="text/css" charSet="UTF-8"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="../vendors/css/braft.min.css" rel="stylesheet" type="text/css" />
        <link href="https://cdn.bootcss.com/highlight.js/9.11.0/styles/atelier-estuary-light.min.css" rel="stylesheet" />
        {
          Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key}
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )
        }

      </head>
      <body>
      <div id="content" style={{height: '100%'}} dangerouslySetInnerHTML={{__html: content}}/>
      <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(stores)};`}} charSet="UTF-8"/>
      <script src={assets.javascript['common.js']} charSet="UTF-8"/>
      <script id="mainJs" src={assets.javascript.main} charSet="UTF-8"/>
      </body>
      </html>
    );
  }
}
