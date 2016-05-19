import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class SelectOption extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    label: PropTypes.string,
    active: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };

  handleClick = () => this.props.onSelect(this.props.value);

  render() {
    const classes = classnames('pui--select__option', { active: this.props.active });

    return (
      <li
        className={classes}
        onClick={this.handleClick}
      >
        {this.props.label || this.props.value}
      </li>
    );
  }
}
