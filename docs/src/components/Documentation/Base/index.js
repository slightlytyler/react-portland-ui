import React, { Component, PropTypes } from 'react';
import PropTypesDocumentation from '../PropTypes';
import ExamplesDocumentation from '../Examples';
import { GITHUB_URL } from 'config';

export default class Documentation extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    propTypes: PropTypes.object.isRequired,
    examples: PropTypes.string.isRequired,
  };

  renderGithubLink = () => {
    const path = this.props.file.substr(2);

    return (
      <section className="github">
        <a className="link" href={`${GITHUB_URL}/tree/master/${path}`} target="_blank" >
          {path}
        </a>
      </section>
    );
  };

  render() {
    return (
      <div className="documentation">
        <header className="header">
          <section className="name">{this.props.name}</section>
          {this.renderGithubLink()}
        </header>
        <section className="description">{this.props.description}</section>
        <PropTypesDocumentation propTypes={this.props.propTypes} />
        <ExamplesDocumentation name={this.props.name} examples={this.props.examples} />
      </div>
    );
  }
}
