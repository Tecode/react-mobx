import React, {Component} from 'react';
import { observer } from 'mobx-react';

function hoc({mapDataToProps}) {
  return (WrappedComponent) => {
    class {{ properCase name }} extends Component {
      render() {
        console.log(mapDataToProps(this.props));
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
    return observer({{ properCase name }});
  };
}
export default hoc;
