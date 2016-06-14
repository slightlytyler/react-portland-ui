import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TableBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const classes = classnames('pui--table__body', this.props.className);

    return (
      <tbody className={classes}>{this.props.children}</tbody>
    );
  }
}
