import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Label extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const classes = classnames('pui--label', this.props.className);

    return (
      <label className={classes}>{this.props.children}</label>
    );
  }
}
