import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Content extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  renderEmptyState = () => (
    <div className="empty-state">
      <header className="header">Sandbox</header>
    </div>
  );

  renderContent = () => {
    if (this.props.children) return this.props.children;
    return this.renderEmptyState();
  };

  render() {
    const classes = classnames('page__content', { empty: !this.props.children });

    return (
      <div className={classes}>
        {this.renderContent()}
      </div>
    );
  }
}
