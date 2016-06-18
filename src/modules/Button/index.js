import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import classnames from 'classnames';

export default class Button extends Component {
  static documentation = {
    name: 'Button',
    module: 'buttons',
    description: 'Hey this is a great button.',
    examples: '<Button>Great Button</Button>',
  };

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    /**
     * HTML type attribute
     */
    type: PropTypes.string,
    onClick: PropTypes.func,
    /**
     * If true component has ghost styling
     */
    ghost: PropTypes.bool,
    /**
     * If true component expands to fill container
     */
    fluid: PropTypes.bool,
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
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
