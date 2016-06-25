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
    dropdown: PropTypes.arrayOf(PropTypes.oneOfType([
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
     * If true component will be big size
     */
    big: PropTypes.bool,
    /**
     * Background color of the button
     */
    color: PropTypes.string,
    /**
     * If true button expands to fill container
     */
    fluid: PropTypes.bool,
    /**
     * If true button is ghost style
     */
    ghost: PropTypes.bool,
    /**
     * If true button is rounded style
     */
    rounded: PropTypes.bool,
    /**
     * If true button is thinner
     */
    thin: PropTypes.bool,
  };

  static contextTypes = {
    reactFormalContext: PropTypes.bool,
  };

  render() {
    const classes = classnames(
      'pui--button',
      this.props.className,
      {
        big: this.props.big,
        fluid: this.props.fluid,
        ghost: this.props.ghost,
        rounded: this.props.rounded,
        thin: this.props.thin,
      }
    );

    if (this.context.reactFormalContext) {
      return (
        <FormalButton
          className={classes}
          type={this.props.type}
          onClick={this.props.onClick}
          onMouseDown={this.props.onMouseDown}
          onMouseUp={this.props.onMouseUp}
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
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
      >
        {this.props.children}
      </button>
    );
  }
}
