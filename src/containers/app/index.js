import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
import NavBar from 'components/NavBar';
import HomePage from '../homePage';
import Article from '../article';
import ArticleList from '../articleList';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';
// import Modal from 'components/common/Modal';
// import Message from 'components/common/Message';

// @inject('modalStore', 'messageStore')
@observer
export default class App extends Component {
  static propTypes = {
    // children: PropTypes.object.isRequired,
    location: PropTypes.object,
    clientStore: PropTypes.object,
    modalStore: PropTypes.object,
    detailModalStore: PropTypes.object,
    messageStore: PropTypes.object,
    payModalStore: PropTypes.object,
    entireLoadingStore: PropTypes.object,
  };

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className={styles.wrap} id="appWrap">
          {false && <DevTools />}
          <NavBar>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/article" component={Article} />
              <Route exact path="/article_list" component={ArticleList} />
              {/*<Route exact path="/users" name="home-users" component={NotFound} />*/}
              {/*<Redirect to="/home" />*/}
            </Switch>
          </NavBar>
        </div>
      </LocaleProvider>
    );
  }
}
