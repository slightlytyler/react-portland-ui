import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Table extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const classes = classnames('pui--table', this.props.className);

    return (
      <div className={classes}>
        <table className="table">{this.props.children}</table>
      </div>
    );
  }
}
