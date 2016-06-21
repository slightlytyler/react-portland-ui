import React, { Component, PropTypes } from 'react';
import Documentation from './Documentation';

export default class Content extends Component {
  static propTypes = {
    components: PropTypes.array.isRequired,
  };

  renderDocumentation = () => this.props.components.map(doc => (
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
