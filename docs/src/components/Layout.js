import React, { Component } from 'react';
import SideBar from 'components/SideBar';
import Content from 'components/Content';

export default class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <SideBar />
        <Content />
      </div>
    );
  }
}
