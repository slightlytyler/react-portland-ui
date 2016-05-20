import React, { Component, PropTypes } from 'react';
import { Button as FormalButton } from 'react-formal';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    ghost: PropTypes.bool,
    fluid: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    const classes = classnames(
      'pui--button',
      {
        ghost: this.props.ghost,
        fluid: this.props.fluid,
      }
    );

    return (
      <FormalButton className={classes} type={this.props.type}>
        {this.props.children}
      </FormalButton>
    );
  }
}
