import React, { Component, PropTypes } from 'react';
import SideBar from 'components/SideBar';
import Content from 'components/Content';

export default class Root extends Component {
  static propTypes = {
    modules: PropTypes.array.isRequired,
    components: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="layout">
        <SideBar modules={this.props.modules} />
        <Content components={this.props.components} />
      </div>
    );
  }
}
