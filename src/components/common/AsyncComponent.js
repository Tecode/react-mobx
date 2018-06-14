import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CirclesLoading from 'components/common/CirclesLoading';

export default class AsyncComponent extends Component {
  static propTypes = {
    loader: PropTypes.func.isRequired,
    renderPlaceholder: PropTypes.func
  };
  state = {
    component: null
  }
  componentDidMount() {
    this.props.loader((componentModule) => {
      // console.log('componentModule', componentModule);
      this.setState({
        component: componentModule
      });
    });
  }
  renderPlaceholder() {
    return <CirclesLoading />;
  }
  render() {
    if (this.state.component) {
      return <this.state.component {...this.props}/>;
    }
    return (this.props.renderPlaceholder || this.renderPlaceholder)();
  }
}
