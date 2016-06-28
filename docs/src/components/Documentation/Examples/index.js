import React, { Component, PropTypes } from 'react';
import * as packages from 'pui';
import Item from './Item';
import * as icons from 'pui/icons';

export default class ExamplesDocumentation extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    // eslint-disable-next-line global-require
    const component = require(`build/examples/${this.props.name}`);

    return (
      <div className="documentation__examples">
        {component(React)({
          Example: Item,
          icons,
          ...packages,
        })}
      </div>
    );
  }
}
