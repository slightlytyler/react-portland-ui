import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import Icon from 'packages/Icon';
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
     * Background color of the button
     */
    color: PropTypes.string,
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
    iconBackgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
    iconJustify: PropTypes.oneOf(['edge', 'center']),
    iconSide: PropTypes.oneOf(['left', 'right']),
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
    /**
     * If true component does not have minimum width
     */
    collapse: PropTypes.bool,
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

  static defaultProps = {
    iconSide: 'left',
    iconJustify: 'edge',
  };

  renderContent = () => {
    const { children, icon } = this.props;

    if (icon) {
      const { iconSide: side, iconJustify: justify } = this.props;
      const classes = classnames('icon', justify, side);

      switch (side) {
        case 'right':
          return (
            <div className="inner">
              {children}
              <Icon className={classes} path={icon} />
            </div>
          );

        case 'left':
        default:
          return (
            <div className="inner">
              <Icon className={classes} path={icon} />
              {children}
            </div>
          );
      }
    }

    return (
      <div className="inner">
        {children}
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
    const props = {
      className: classes,
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
