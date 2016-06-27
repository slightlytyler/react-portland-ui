import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ButtonGroup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    /**
     * Background of the button
     */
    background: PropTypes.string,
    /**
     * Text color of the button
     */
    color: PropTypes.string,
    /**
     * If true component will be big size
     */
    big: PropTypes.bool,
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

  applyButtonProps = Button => React.cloneElement(Button, {
    background: this.props.background,
    color: this.props.color,
    big: this.props.big,
    ghost: this.props.ghost,
    rounded: this.props.rounded,
    thin: this.props.thin,
  })

  render() {
    const classes = classnames('pui--button__group', this.props.className);

    return (
      <div className={classes}>
        {React.Children.map(this.props.children, this.applyButtonProps)}
      </div>
    );
  }
}
