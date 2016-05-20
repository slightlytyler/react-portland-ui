import React, { Component, PropTypes } from 'react';
import Formal from 'react-formal';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    schema: PropTypes.object.isRequired,
    defaultValue: PropTypes.object.isRequired,
  };

  state = {
    errors: {},
  };

  getErrorForName = name => this.state.errors[name];

  handleErrors = errors => this.setState({ errors });

  renderChildren() {
    return React.Children.map(this.props.children, child => (
      React.cloneElement(child, { error: this.getErrorForName(child.props.name) })
    ));
  }

  render() {
    return (
      <Formal
        className="pui--form"
        schema={this.props.schema}
        defaultValue={this.props.defaultValue}
        onError={this.handleErrors}
      >
        {this.renderChildren()}
      </Formal>
    );
  }
}
