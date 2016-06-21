import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { omit } from 'lodash';
import Formal from 'react-formal';
import FieldSet from '../FieldSet';

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    schema: PropTypes.object.isRequired,
    defaultValue: PropTypes.object.isRequired,
    onError: PropTypes.func,
    panel: PropTypes.bool,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    panel: false,
    fluid: false,
  };

  state = {
    errors: {},
  };

  getErrorForName = name => this.state.errors[name];

  handledProps = [
    'className',
    'children',
    'onError',
    'panel',
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
      {
        panel: this.props.panel,
        fluid: this.props.fluid,
      }
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
