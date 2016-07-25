import React, { Component, PropTypes } from 'react';

export default class RadioButton extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  handleChange = () => {
    if (!this.props.checked) this.props.onChange(this.props.value);
  };

  render() {
    return (
      <div className="pui--radio__button">
        <input
          ref="dummy"
          className="dummy"
          id={this.props.value}
          type="radio"
          value={this.props.value}
          onChange={this.handleChange}
          checked={this.props.checked}
        />
        <label htmlFor={this.props.value} className="input" />
        <span className="label">{this.props.label || this.props.value}</span>
      </div>
    );
  }
}
