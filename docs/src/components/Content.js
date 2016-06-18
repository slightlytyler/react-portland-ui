import React, { Component } from 'react';
import Documentation from './Documentation';
import { components } from 'constants';

export default class Content extends Component {
  renderDocumentation = () => components.map(doc => (
    <Documentation
      key={doc.name}
      name={doc.name}
      file={doc.file}
      description={doc.description}
      propTypes={doc.props}
      examples={doc.examples}
    />
  ));

  render() {
    return (
      <div className="page__content">
        {this.renderDocumentation()}
      </div>
    );
  }
}
