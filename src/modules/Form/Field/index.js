import React, { Component, PropTypes } from 'react';
import { Field, Message } from 'react-formal';
import classnames from 'classnames';
import omit from 'lodash.omit';

export default class FormField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    error: PropTypes.array,
  };

  handledProps = ['label', 'placeholder'];

  placeholder() {
    if (this.props.placeholder) {
      const placeholder = typeof this.props.placeholder === 'string'
        ? this.props.placeholder
        : this.props.label;

      return placeholder;
    }

    return '';
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
    const passProps = omit(this.props, this.handledProps);

    return (
      <div className={classes}>
        {this.renderLabel()}
        <Field {...passProps} placeholder={this.placeholder()} />
      </div>
    );
  }
}
