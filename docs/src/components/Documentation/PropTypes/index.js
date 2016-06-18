import React, { Component, PropTypes } from 'react';
import { capitalize } from 'lodash';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from 'pui/bundle';

export default class PropTypesDocumentation extends Component {
  static propTypes = {
    propTypes: PropTypes.object.isRequired,
  };

  columns = [
    { name: 'name', selector: key => key },
    { name: 'type', selector: (key, value) => value.type.name },
    { name: 'required', selector: (key, value) => (value.required ? 'true' : 'false') },
    {
      name: 'default',
      selector: (key, value) => (
        value.defaultValue ? value.defaultValue.value : 'undefined'
      ),
    },
    { name: 'description', selector: (key, value) => value.description },
  ];

  renderColumns = () => this.columns.map(column => (
    <TableHeadCell key={column.name}>{capitalize(column.name)}</TableHeadCell>
  ));

  renderCells = (key, value) => this.columns.map(column => (
    <TableCell key={`${key}-${column.name}`}>
      {column.selector(key, value)}
    </TableCell>
  ));

  renderRows = () => Object.keys(this.props.propTypes).map(key => (
    <TableRow key={key}>
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
