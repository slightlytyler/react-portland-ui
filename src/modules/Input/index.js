import React, { Component, PropTypes } from 'react';
import { Field, Message } from 'react-formal';
import classnames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    error: PropTypes.array,
    responsive: PropTypes.bool,
  };

  static defaultProps = {
    responsive: true,
  };

  placeholder() {
    if (this.props.placeholder) {
      const placeholder = typeof this.props.placeholder === 'string'
        ? this.props.placeholder
        : this.props.label;

      return placeholder;
    }

    return undefined;
  }

  renderLabel() {
    if (this.props.label) {
      return (
        <div className="label">
          <label className="body">{this.props.label}</label>
          <Message className="message" for={this.props.name} />
        </div>
      );
    }

    return undefined;
  }

  render() {
    const classes = classnames(
      'pui--input',
      { error: this.props.error },
      { responsive: this.props.responsive }
    );

    return (
      <div className={classes}>
        {this.renderLabel()}
        <Field className="input" name={this.props.name} placeholder={this.placeholder()} />
      </div>
    );
  }
}
