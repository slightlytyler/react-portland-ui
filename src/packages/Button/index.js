import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    /**
     * HTML type attribute
     */
    type: PropTypes.string,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    /**
     * Renders dropdown with passed in options
     */
    dropdown: PropTypes.array(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
      }),
      PropTypes.func,
    ])),
    /**
     * If true button dropdown icon is separated by a divider
     */
    dropdownDivder: PropTypes.bool,
    /**
     * Renders icon with passed in path
     */
    icon: PropTypes.string,
    iconAlign: PropTypes.oneOf([
      'center',
      'left',
      'right',
    ]),
    iconColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    /**
     * If true button is thinner
     */
    thin: PropTypes.bool,
    /**
     * If true button is rounded style
     */
    rounded: PropTypes.bool,
    /**
     * Background color of the button
     */
    color: PropTypes.string,
    /**
     * If true button is ghost style
     */
    ghost: PropTypes.bool,
    /**
     * If true button expands to fill container
     */
    fluid: PropTypes.bool,
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
  };

  static contextTypes = {
    reactFormalContext: PropTypes.bool,
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
        <FormalButton
          className={classes}
          type={this.props.type}
          onClick={this.props.onClick}
        >
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
