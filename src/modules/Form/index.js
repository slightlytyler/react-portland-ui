import React, { Component, PropTypes } from 'react';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <form className="pui--form">
        {this.props.children}
      </form>
    );
  }
}
