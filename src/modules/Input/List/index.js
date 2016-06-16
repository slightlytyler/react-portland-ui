import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from 'modules/Icon';
import { check } from 'icons';

export default class ListInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string,
      }),
    ])),
    onChange: PropTypes.func,
  };

  renderOption = option => {
    const value = typeof option === 'object' ? option.value : option;
    const label = typeof option === 'object' ? option.label : value;
    const classes = classnames('option', { active: value === this.props.value });
    const handleClick = () => this.props.onChange(value);

    return (
      <li key={value} className={classes} onClick={handleClick}>
        <section className="check"><Icon className="icon" path={check} /></section>
        <section className="label">{label}</section>
      </li>
    );
  };

  renderOptions = () => this.props.options.map(this.renderOption);

  render() {
    const classes = classnames('pui--input--list', this.props.className);

    return (
      <ul className={classes}>
        {this.renderOptions()}
      </ul>
    );
  }
}
