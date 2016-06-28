import React, { Component, PropTypes } from 'react';

export default class FieldSet extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    errors: PropTypes.object,
  };

  getErrorForName = name => this.props.errors[name];

  renderChildren = () => React.Children.map(this.props.children, child => (
    React.cloneElement(child, {
      className: this.props.className,
      error: this.getErrorForName(child.props.name),
    })
  ));

  render() {
    return (
      <div className="pui--form__field-set">
        {this.renderChildren()}
      </div>
    );
  }
}
