import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
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
    return (
      <div className="pui--input">
        {this.renderLabel()}
        <input className="input" placeholder={this.placeholder()} />
      </div>
    );
  }
}
