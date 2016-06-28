import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ButtonGroup extends Component {
  static propTypes = {
    /**
     * Must be Button components
     */
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    /**
     * Background of the button group
     */
    background: PropTypes.string,
    /**
     * Text color of the button group
     */
    color: PropTypes.string,
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
    /**
     * If true button group expands to fill container
     */
    fluid: PropTypes.bool,
    /**
     * If true button group is ghost style
     */
    ghost: PropTypes.bool,
    /**
     * If true button group is rounded style
     */
    rounded: PropTypes.bool,
    /**
     * If true button group is thinner
     */
    thin: PropTypes.bool,
  };

  passThroughProps = {
    background: this.props.background,
    color: this.props.color,
    big: this.props.big,
    ghost: this.props.ghost,
    rounded: this.props.rounded,
    thin: this.props.thin,
  };

  applyButtonProps = Button => React.cloneElement(Button, this.passThroughProps);

  render() {
    const classes = classnames('pui--button__group', this.props.className, {
      fluid: this.props.fluid,
    });

    return (
      <div className={classes}>
        {React.Children.map(this.props.children, this.applyButtonProps)}
      </div>
    );
  }
}
