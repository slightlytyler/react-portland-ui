import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import Formal from 'react-formal';
import FieldSet from '../FieldSet';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.object,
    fluid: PropTypes.bool,
    onError: PropTypes.func,
    schema: PropTypes.object.isRequired,
  };

  state = {
    errors: {},
  };

  getErrorForName = name => this.state.errors[name];

  handledProps = [
    'className',
    'children',
    'onError',
    'fluid',
  ];

  handleErrors = errors => {
    if (this.props.onError) {
      this.props.onError(errors);
    }

    this.setState({ errors });
  };

  renderChildren = () => React.Children.map(this.props.children, child => {
    const className = classnames('pui--form__input', 'fluid', child.props.className);

    if (child.type === FieldSet) {
      return React.cloneElement(child, { errors: this.state.errors, className });
    }

    return React.cloneElement(child, { error: this.getErrorForName(child.props.name), className });
  });

  render() {
    const classes = classnames(
      'pui--form',
      this.props.className,
      { fluid: this.props.fluid }
    );
    const passProps = omit(this.props, this.handledProps);

    return (
      <Formal
        className={classes}
        onError={this.handleErrors}
        {...passProps}
      >
        {this.renderChildren()}
      </Formal>
    );
  }
}
