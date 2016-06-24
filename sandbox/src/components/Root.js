import React, { Component, PropTypes } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="page__layout">
        <Sidebar />
        <Content>
          {this.props.children}
        </Content>
      </div>
    );
  }
}
