import React, { Component, PropTypes } from 'react';
import jsx from 'react-jsx';
import { modules } from 'pui';
import Item from './Item';

export default class ExamplesDocumentation extends Component {
  static propTypes = {
    examples: PropTypes.string.isRequired,
  };

  render() {
    const component = jsx.server(this.props.examples);

    return (
      <div className="documentation__examples markdown-body">
        {component({ Example: Item, ...modules })}
      </div>
    );
  }
}
