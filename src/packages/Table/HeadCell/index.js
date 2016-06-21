import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from 'packages/Icon';
import { caretDown } from 'icons';

export default class TableHeadCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    sortBy: PropTypes.string,
    sortAscending: PropTypes.bool,
    active: PropTypes.bool,
    onSort: PropTypes.func,
  };

  handleClick = () => {
    if (this.props.onSort) {
      if (this.props.active) {
        this.props.onSort(this.props.sortBy, !this.props.sortAscending);
      } else {
        this.props.onSort(this.props.sortBy, this.props.sortAscending);
      }
    }
  };

  renderIcon = () => {
    if (this.props.onSort) {
      return <Icon className="icon" path={caretDown} />;
    }

    return undefined;
  };

  render() {
    const classes = classnames('pui--table__head__cell', this.props.className, {
      sortable: this.props.onSort,
      active: this.props.active,
      ascending: this.props.sortAscending,
    });

    return (
      <th className={classes} onClick={this.handleClick}>
        <div className="container">
          {this.props.children}
          {this.renderIcon()}
        </div>
      </th>
    );
  }
}
