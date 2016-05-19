import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    responsive: PropTypes.bool,
  };

  static defaultProps = {
    responsive: true,
  };

  placeholder() {
    if (this.props.placeholder) {
      const placeholder = typeof this.props.placeholder === 'string'
        ? this.props.placeholder
        : this.props.label;

      return placeholder;
    }

    return undefined;
  }

  renderLabel() {
    if (this.props.label) {
      return <label className="label">{this.props.label}</label>;
    }

    return undefined;
  }

  render() {
    const classes = classnames('pui--input', { responsive: this.props.responsive });

    return (
      <div className={classes}>
        {this.renderLabel()}
        <input className="input" placeholder={this.placeholder()} />
      </div>
    );
  }
}
