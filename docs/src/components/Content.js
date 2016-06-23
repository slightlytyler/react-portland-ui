import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import keycode from 'keycode';
import { Input } from 'pui';
import Documentation from './Documentation';

export class Content extends Component {
  static propTypes = {
    packages: PropTypes.array.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  };

  handleKeyDown = e => {
    if (keycode(e) === 'enter') {
      const { target } = e;

      if (target.value) {
        this.props.router.push({
          pathname: '/',
          query: { search: target.value },
        });
      } else {
        this.props.router.push('/');
      }

      target.value = '';
    }
  };

  renderEmptyState = () => (
    <section className="empty-state">
      <header className="header">No modules found for your search.</header>
      <Input
        className="input"
        placeholder="Search for packages"
        onKeyDown={this.handleKeyDown}
        ghost
      />
    </section>
  );

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

  renderContent = () => {
    if (this.props.packages.length) return this.renderDocumentation();
    return this.renderEmptyState();
  }

  render() {
    const classes = classnames('page__content', { empty: !this.props.packages.length });

    return (
      <div className={classes}>
        {this.renderContent()}
      </div>
    );
  }
}

export default withRouter(Content);
