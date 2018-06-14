import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
// import NavBar from 'components/navBar';
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
          {/* <NavBar/> */}
          {/* <Modal modalStore={this.props.modalStore}/> */}
          {/* <Message messageStore={this.props.messageStore}/> */}
          <div className={styles.content}>
            45
          {/* {this.props.children} */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
