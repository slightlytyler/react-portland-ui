import React, { Component, PropTypes } from 'react';

export default class ExamplesDocumentation extends Component {
  static propTypes = {
    examples: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="documentation__examples">{this.props.examples}</div>
    );
  }
}
