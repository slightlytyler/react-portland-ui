import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Formal from 'react-formal';
import FieldSet from '../FieldSet';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    schema: PropTypes.object.isRequired,
    defaultValue: PropTypes.object.isRequired,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    fluid: false,
  };

  state = {
    errors: {},
  };

  getErrorForName = name => this.state.errors[name];

  handleErrors = errors => this.setState({ errors });

  renderChildren = () => React.Children.map(this.props.children, child => {
    if (child.type === FieldSet) {
      return React.cloneElement(child, { errors: this.state.errors });
    }

    return React.cloneElement(child, { error: this.getErrorForName(child.props.name) });
  });

  render() {
    const classes = classnames('pui--form', { fluid: this.props.fluid });

    return (
      <Formal
        className={classes}
        schema={this.props.schema}
        defaultValue={this.props.defaultValue}
        onError={this.handleErrors}
      >
        {this.renderChildren()}
      </Formal>
    );
  }
}
