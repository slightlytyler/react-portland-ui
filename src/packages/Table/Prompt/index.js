import React, { Component, PropTypes } from 'react';
import TableRow from '../Row';
import TableCell from '../Cell';

export default class TablePrompt extends Component {
  static propTypes = {
    children: PropTypes.node,
    colSpan: PropTypes.number,
  };

  static defaultProps = {
    colSpan: 1,
  };

  render() {
    return (
      <TableRow className="pui--table__prompt">
        <TableCell className="loading-state" colSpan={this.props.colSpan}>
          {this.props.children}
        </TableCell>
      </TableRow>
    );
  }
}
