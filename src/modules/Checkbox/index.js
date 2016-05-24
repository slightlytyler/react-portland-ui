import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pickDiff from 'helpers/pickDiff';
import Icon from 'react-svgcon';
import checkIcon from 'icons/check.svg';

export default class Switch extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    error: PropTypes.array,
  };

  shouldComponentUpdate(nextProps) {
    const acceptedProps = ['value', 'error'];

    if (pickDiff(this.props, nextProps, acceptedProps)) {
      return true;
    }

    return false;
  }

  handleChange = e => this.props.onChange(e.target.checked);

  render() {
    const classes = classnames('pui--checkbox', { error: this.props.error });

    return (
      <div className={classes}>
        <input
          id={this.props.name}
          type="checkbox"
          value={this.props.value}
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.name}>
          <Icon key="check" className="check icon" path={checkIcon} />
        </label>
      </div>
    );
  }
}
