import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { capitalize } from 'lodash';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from 'pui';

export default class PropTypesDocumentation extends Component {
  static propTypes = {
    propTypes: PropTypes.object.isRequired,
  };

  columns = [
    { name: 'name', selector: key => key },
    { name: 'type', selector: (key, value) => value.type.name },
    {
      name: 'default',
      selector: (key, value) => (
        value.defaultValue ? value.defaultValue.computed : undefined
      ),
    },
    { name: 'description', selector: (key, value) => value.description },
  ];

  renderColumns = () => this.columns.map(column => (
    <TableHeadCell className="cell" key={column.name}>{capitalize(column.name)}</TableHeadCell>
  ));

  renderCell = (value, columnName, prop) => {
    switch (columnName) {
      case 'name':
      case 'type':
        return <code>{value}</code>;

      case 'required':
        return value ? <code>required</code> : '';

      case 'default': {
        if (prop.required) return <span className="required">Required</span>;

        if (typeof value === 'string') return value;

        return typeof value === 'undefined'
          ? <code>undefined</code>
          : <code>{value.toString()}</code>;
      }

      default:
        return value;
    }
  };

  renderCells = (key, value) => this.columns.map(column => (
    <TableCell className={classnames('cell', column.name)} key={`${key}-${column.name}`}>
      {this.renderCell(column.selector(key, value), column.name, value)}
    </TableCell>
  ));

  renderRows = () => Object.keys(this.props.propTypes).map(key => (
    <TableRow className="row" key={key}>
      {this.renderCells(key, this.props.propTypes[key])}
    </TableRow>
  ));

  render() {
    return (
      <div className="documentation__prop-types">
        <header className="header">Props</header>
        <Table className="table">
          <TableHead>
            <TableRow>
              {this.renderColumns()}

            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}
