import React from 'react';
import { observer } from 'mobx-react';

function hoc({mapDataToProps}) {
  return (WrappedComponent) => {
    function {{ properCase name }}(props) {
      console.log(mapDataToProps(props));
      return (
        <WrappedComponent {...props} />
      );
    }
    return observer({{ properCase name }});
  };
}
export default hoc;
