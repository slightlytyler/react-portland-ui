import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SelectOption extends Component {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    active: PropTypes.bool,
  };

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleMouseUp = e => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.value && this.props.onSelect) {
      this.props.onSelect(this.props.value);
    }
  };

  render() {
    const classes = classnames('pui--select__option', { active: this.props.active });

    return (
      <li
        className={classes}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {this.props.label || this.props.value}
      </li>
    );
  }
}
