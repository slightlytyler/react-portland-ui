import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { pickDiff } from 'helpers';
import Icon from 'packages/Icon';
import { check } from 'icons';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    /**
     * Used as elements ID
     */
    error: PropTypes.array,
    label: PropTypes.string,
    labelComponent: PropTypes.element,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    const acceptedProps = ['value', 'error'];

    if (pickDiff(this.props, nextProps, acceptedProps)) {
      return true;
    }

    return false;
  }

  handleChange = e => {
    if (this.props.onChange) this.props.onChange(e.target.checked);
  };

  renderLabel = () => {
    if (this.props.labelComponent) return this.props.labelComponent;
    return <span className="label">{this.props.label}</span>;
  };

  render() {
    const classes = classnames(
      'pui--checkbox',
      this.props.className,
      {
        error: this.props.error,
      }
    );

    return (
      <div className={classes}>
        <input
          ref="dummy"
          id={this.props.name}
          className="dummy"
          type="checkbox"
          checked={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <label
          htmlFor={this.props.name}
          className="body"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          <Icon key="check" className="check icon" svg={check} />
        </label>
        {this.renderLabel()}
      </div>
    );
  }
}
