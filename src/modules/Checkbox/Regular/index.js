import React, { PropTypes } from 'react';
import Base from '../Base';
import classnames from 'classnames';
import { pickDiff } from 'helpers';
import Icon from 'react-svgcon';
import checkIcon from 'icons/check.svg';

export default class Switch extends Base {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    error: PropTypes.array,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const acceptedProps = ['value', 'error'];
    const acceptedState = ['focusing'];

    if (
      pickDiff(this.props, nextProps, acceptedProps)
      || pickDiff(this.state, nextState, acceptedState)
    ) {
      return true;
    }

    return false;
  }

  render() {
    const classes = classnames(
      'pui--checkbox',
      {
        focusing: this.getFocusingClassName(),
        error: this.props.error,
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
          <Icon key="check" className="check icon" path={checkIcon} />
        </label>
      </div>
    );
  }
}
