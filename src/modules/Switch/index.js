import React, { Component, PropTypes } from 'react';
import Icon from 'react-svgcon';
import checkIcon from 'icons/check.svg';
import closeIcon from 'icons/close.svg';

export default class Switch extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
  };

  handleChange = e => this.props.onChange(e.target.checked);

  render() {
    return (
      <div className="pui--switch">
        <input
          id={this.props.name}
          type="checkbox"
          value={this.props.value}
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.name}>
          <div className="knob">
            <Icon className="check icon" path={checkIcon} color="currentColor" />
            <Icon className="close icon" path={closeIcon} color="currentColor" />
          </div>
        </label>
      </div>
    );
  }
}
