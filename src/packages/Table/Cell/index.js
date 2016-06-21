import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TableCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    colSpan: PropTypes.number,
  };

  render() {
    const classes = classnames('pui--table__cell', this.props.className);

    return (
      <td className={classes} colSpan={this.props.colSpan}>
        {this.props.children}
      </td>
    );
  }
}
