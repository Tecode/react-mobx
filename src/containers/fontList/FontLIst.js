import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FontListBody from 'components/FontList';
import PropTypes from 'prop-types';


@inject('fontListStore')
@observer
export default class HomePage extends Component {
  static propTypes = {
    fontListStore: PropTypes.object
  };
  componentDidMount() {
    this.props.fontListStore.getListData();
  }
  render() {
    return <FontListBody />;
  }
}
