import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.array,
    responsive: PropTypes.bool,
  };

  static defaultProps = {
    responsive: true,
  };

  handleChange = e => this.props.onChange(e.target.value);

  render() {
    const classes = classnames(
      'pui--input',
      { error: this.props.error },
      { responsive: this.props.responsive }
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
