import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TableHead extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    sortBy: PropTypes.string,
    sortAscending: PropTypes.bool,
    active: PropTypes.bool,
    onSort: PropTypes.func,
  };

  render() {
    const classes = classnames('pui--table__head', this.props.className);

    return (
      <thead className={classes}>{this.props.children}</thead>
    );
  }
}
