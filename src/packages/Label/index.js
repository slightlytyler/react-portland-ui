import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Label extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const classes = classnames('pui--label', this.props.className);

    return (
      <label className={classes}>{this.props.children}</label>
    );
  }
}
