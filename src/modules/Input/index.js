import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.array,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    fluid: true,
  };

  handleChange = e => this.props.onChange(e.target.value);

  render() {
    const classes = classnames(
      'pui--input',
      { error: this.props.error },
      { fluid: this.props.fluid }
    );

    return (
      <input
        className={classes}
        value={this.props.value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}
