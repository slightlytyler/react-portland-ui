import React, { Component, PropTypes } from 'react';
import { Field, Message } from 'react-formal';
import classnames from 'classnames';

export default class FormField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.array,
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
    const classes = classnames('pui--form__field', { error: this.props.error });

    return (
      <div className={classes}>
        {this.renderLabel()}
        <Field {...this.props} />
      </div>
    );
  }
}
