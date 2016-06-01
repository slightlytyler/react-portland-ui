import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    ghost: PropTypes.bool,
    fluid: PropTypes.bool,
    big: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    const classes = classnames(
      'pui--button',
      this.props.className,
      {
        ghost: this.props.ghost,
        fluid: this.props.fluid,
        big: this.props.big,
      }
    );

    if (this.context.reactFormalContext) {
      return (
        <FormalButton className={classes} type={this.props.type}>
          {this.props.children}
        </FormalButton>
      );
    }

    return (
      <button
        className={classes}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
