import React, { Component, PropTypes } from 'react';

export default class RadioButton extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
  };

  handleChange = () => this.props.onChange(this.props.value);

  render() {
    return (
      <div>
        <input
          type="radio"
          value={this.props.value}
          onChange={this.handleChange}
          checked={this.props.checked}
        />
        <label>{this.props.label || this.props.value}</label>
      </div>
    );
  }
}
