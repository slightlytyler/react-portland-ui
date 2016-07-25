import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import classnames from 'classnames';
import color from 'helpers/color';
import Icon from 'packages/Icon';

export default class Button extends Component {
  static propTypes = {
    /**
     * Background of the button
     */
    background: PropTypes.string,
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    /**
     * If true component does not have minimum width
     */
    collapse: PropTypes.bool,
    /**
     * Text color of the button
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
     * Renders icon with passed in path
     */
    icon: PropTypes.string,
    iconBackground: PropTypes.string,
    iconColor: PropTypes.string,
    iconJustify: PropTypes.oneOf(['edge', 'center']),
    iconSide: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    /**
     * If true button is rounded style
     */
    rounded: PropTypes.bool,
    /**
     * If true button is thinner
     */
    thin: PropTypes.bool,
    /**
     * HTML type attribute
     */
    type: PropTypes.string,
  };

  static contextTypes = {
    reactFormalContext: PropTypes.object,
  };

  static defaultProps = {
    iconSide: 'left',
    iconJustify: 'edge',
  };

  renderIcon = () => (
    <div
      className={classnames(
        'icon',
        this.props.iconJustify,
        this.props.iconSide,
        { background: color(this.props.iconBackground) },
      )}
      style={{ background: color(this.props.iconBackground) }}
    >
      <Icon
        className="element"
        style={{ color: this.props.iconColor }}
        svg={this.props.icon}
      />
    </div>
  );

  renderContent = () => {
    if (this.props.icon) {
      switch (this.props.iconSide) {
        case 'right':
          return (
            <div className="inner">
              {this.props.children}
              {this.renderIcon()}
            </div>
          );

        case 'left':
        default:
          return (
            <div className="inner">
              {this.renderIcon()}
              {this.props.children}
            </div>
          );
      }
    }

    return (
      <div className="inner">
        {this.props.children}
      </div>
    );
  }

  render() {
    const classes = classnames(
      'pui--button',
      this.props.className,
      {
        big: this.props.big,
        collapse: this.props.collapse,
        fluid: this.props.fluid,
        ghost: this.props.ghost,
        rounded: this.props.rounded,
        thin: this.props.thin,
      }
    );
    const style = {
      background: color(this.props.background),
      color: color(this.props.color),
    };
    const props = {
      className: classes,
      style,
      type: this.props.type,
      onClick: this.props.onClick,
      onMouseDown: this.props.onMouseDown,
      onMouseUp: this.props.onMouseUp,
    };

    if (this.context.reactFormalContext) {
      return (
        <FormalButton {...props}>
          {this.renderContent()}
        </FormalButton>
      );
    }

    return (
      <button {...props}>
        {this.renderContent()}
      </button>
    );
  }
}
