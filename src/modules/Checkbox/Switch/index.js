import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { pickDiff } from 'helpers';
import Icon from 'react-svgcon';
import checkIcon from 'icons/check.svg';
import closeIcon from 'icons/close.svg';

export default class Switch extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    square: PropTypes.bool,
  };

  static defaultProps = {
    square: false,
  };

  shouldComponentUpdate(nextProps) {
    const acceptedProps = ['value', 'square'];

    if (pickDiff(this.props, nextProps, acceptedProps)) {
      return true;
    }

    return false;
  }

  handleChange = e => {
    if (this.props.onChange) this.props.onChange(e.target.checked);
  };

  renderKnob = () => {
    if (this.props.square) {
      return (
        <div className="knob">
          <Icon className="check icon" path={checkIcon} />
          <Icon className="close icon" path={closeIcon} />
        </div>
      );
    }

    return [
      <div key="knob" className="knob" />,
      <Icon key="check" className="check icon" path={checkIcon} />,
      <Icon key="close" className="close icon" path={closeIcon} />,
    ];
  };

  render() {
    const classes = classnames(
      'pui--switch',
      {
        square: this.props.square,
        regular: !this.props.square,
      }
    );

    return (
      <div className={classes}>
        <input
          ref="dummy"
          id={this.props.name}
          type="checkbox"
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <label
          htmlFor={this.props.name}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {this.renderKnob()}
        </label>
      </div>
    );
  }
}
