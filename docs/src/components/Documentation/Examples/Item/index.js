import React, { Component, PropTypes } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import classnames from 'classnames';
import { CodeBlock, Button } from 'pui';

export default class ExamplesDcumentationItem extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    expanded: false,
  };

  toggleExpand = () => this.setState({ expanded: !this.state.expanded });

  renderExpandButton = () => (
    <Button className="expand-button" onClick={this.toggleExpand} collapse ghost thin>
      {this.state.expanded ? 'Hide Source' : 'Show Source'}
    </Button>
  );

  renderExample = () => (
    <section className="example">{this.props.children}</section>
  );

  renderJSX = () => reactElementToJSXString(this.props.children, { showDefaultProps: false })

  renderCode = () => {
    if (this.state.expanded) {
      return (
        <CodeBlock className="code" language="jsx">
          {this.renderJSX()}
        </CodeBlock>
      );
    }

    return undefined;
  };

  render() {
    const classes = classnames('item', { expanded: this.state.expanded });

    return (
      <div className={classes}>
        {this.renderExpandButton()}
        {this.renderExample()}
        {this.renderCode()}
      </div>
    );
  }
}
