import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TableRow extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const classes = classnames('pui--table__row', this.props.className);

    return (
      <tr className={classes}>{this.props.children}</tr>
    );
  }
}
