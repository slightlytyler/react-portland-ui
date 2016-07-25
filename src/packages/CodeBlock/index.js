import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';

export default class CodeBlock extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    language: PropTypes.string,
  };

  renderCode = () => Prism.highlight(this.props.children, Prism.languages[this.props.language]);

  render() {
    const languageClass = `language-${this.props.language}`;
    const classes = classnames(
      'pui--code-block',
      this.props.className,
      languageClass,
    );

    return (
      <pre className={classes}>
        <code
          className={languageClass}
          dangerouslySetInnerHTML={{ __html: this.renderCode() }}
        />
      </pre>
    );
  }
}
