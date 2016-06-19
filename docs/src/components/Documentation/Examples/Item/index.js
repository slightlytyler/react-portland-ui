import React, { Component, PropTypes } from 'react';

export default class ExamplesDcumentationItem extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="item">{this.props.children}</div>
    );
  }
}
