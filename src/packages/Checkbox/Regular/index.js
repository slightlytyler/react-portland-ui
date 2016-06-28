import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { pickDiff } from 'helpers';
import Icon from 'packages/Icon';
import { check } from 'icons';

export default class Checkbox extends Component {
  static propTypes = {
     /**
     * Used as elements ID
     */
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.array,
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

  render() {
    const classes = classnames('pui--checkbox', { error: this.props.error });

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
          <Icon key="check" className="check icon" svg={check} />
        </label>
        <span className="label">{this.props.label}</span>
      </div>
    );
  }
}
