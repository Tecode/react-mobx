import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

function hoc(store) {
  return WrappedComponent => {
    class BatchReport extends Component {
      static propTypes = {
        [store]: PropTypes.object,
        companyHomeStore: PropTypes.object
      };
      componentDidMount() {
        if (!this.props[store].isMount) {
          const idParams = this.props.companyHomeStore.reportInfo;
          this.props[store].getReportModule(idParams);
        }
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return inject('companyHomeStore')(observer(BatchReport));
  };
}
export default hoc;
