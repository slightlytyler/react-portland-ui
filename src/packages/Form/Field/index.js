import React, { Component, PropTypes } from 'react';
import { Field, Message } from 'react-formal';
import Label from '../../Label';
import classnames from 'classnames';
import { omit } from 'lodash';

export default class FormField extends Component {
  static propTypes = {
    error: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    width: PropTypes.number,
  };

  handledProps = ['label', 'placeholder'];

  placeholder = () => {
    if (this.props.placeholder) {
      const placeholder = typeof this.props.placeholder === 'string'
        ? this.props.placeholder
        : this.props.label;

      return placeholder;
    }

    return '';
  };

  widthStyles = () => {
    if (this.props.width) return { flex: this.props.width };
    return {};
  };

  renderLabel = () => {
    if (this.props.label) {
      return (
        <div className="label">
          <Label className="body">{this.props.label}</Label>
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
      <div className={classes} style={this.widthStyles()}>
        {this.renderLabel()}
        <Field {...passProps} placeholder={this.placeholder()} />
      </div>
    );
  }
}
