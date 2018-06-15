import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
import NavBar from 'components/NavBar';
import HomePage from '../homePage';
import Article from '../article';
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
      <React.Fragment>
        <div className={styles.wrap} id="appWrap">
          {false && <DevTools />}
          <NavBar>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/article" component={Article} />
              {/*<Route exact path="/users" name="home-users" component={NotFound} />*/}
              <Redirect to="/article" />
            </Switch>
          </NavBar>
        </div>
      </React.Fragment>
    );
  }
}
