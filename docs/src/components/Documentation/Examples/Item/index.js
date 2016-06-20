import React, { Component, PropTypes } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { CodeBlock } from 'pui';

export default class ExamplesDcumentationItem extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  renderCode = () => reactElementToJSXString(this.props.children);

  render() {
    return (
      <div className="item">
        <section className="example">{this.props.children}</section>
        <CodeBlock className="code" language="jsx">
          {this.renderCode()}
        </CodeBlock>
      </div>
    );
  }
}
