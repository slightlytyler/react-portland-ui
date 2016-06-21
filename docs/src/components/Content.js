import React, { Component, PropTypes } from 'react';
import Documentation from './Documentation';

export default class Content extends Component {
  static propTypes = {
    packages: PropTypes.array.isRequired,
  };

  renderDocumentation = () => this.props.packages.map(doc => (
    <Documentation
      key={doc.name}
      name={doc.name}
      module={doc.module}
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
