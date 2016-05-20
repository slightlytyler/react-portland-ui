import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SelectOption extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    label: PropTypes.string,
    active: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleMouseUp = () => this.props.onSelect(this.props.value);

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
