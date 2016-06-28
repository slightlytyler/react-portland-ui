import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { pickDiff } from 'helpers';
import Icon from 'packages/Icon';
import { check, close } from 'icons';

export default class Switch extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * Used as elements ID
     */
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.array,
    /**
     * If true switch is square style
     */
    square: PropTypes.bool,
  };

  static defaultProps = {
    square: false,
  };

  shouldComponentUpdate(nextProps) {
    const acceptedProps = ['value', 'error', 'square'];

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
          <Icon className="check icon" svg={check} />
          <Icon className="close icon" svg={close} />
        </div>
      );
    }

    return [
      <div key="knob" className="knob" />,
      <Icon key="check" className="check icon" svg={check} />,
      <Icon key="close" className="close icon" svg={close} />,
    ];
  };

  render() {
    const classes = classnames(
      'pui--switch',
      this.props.className,
      {
        error: this.props.error,
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
          checked={this.props.value}
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
        <span className="label">{this.props.label}</span>
      </div>
    );
  }
}
