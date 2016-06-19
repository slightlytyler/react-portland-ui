import React, { Component, PropTypes } from 'react';
import { modules } from 'pui';
import jsx from 'react-jsx';

export default class ExamplesDocumentation extends Component {
  static propTypes = {
    examples: PropTypes.string.isRequired,
  };

  render() {
    const component = jsx.server(this.props.examples);

    return (
      <div className="documentation__examples">
        {component({ ...modules })}
      </div>
    );
  }
}
