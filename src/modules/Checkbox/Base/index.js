/* eslint-disable react/prop-types */

import { Component } from 'react';
import { focusNode } from 'helpers';

export default class BaseCheckbox extends Component {
  state = {
    active: false,
    focusing: false,
  };

  getFocusingClassName = () => this.state.focusing || this.state.active;

  focus = () => focusNode(this.refs.dummy);

  handleChange = e => {
    if (this.props.onChange) this.props.onChange(e.target.checked);
  };

  handleFocus = () => this.setState({ focusing: true });

  handleBlur = () => this.setState({ focusing: false });

  handleMouseDown = () => this.setState({ active: true });

  handleMouseUp = () => {
    this.focus();
    this.setState({ active: false });
  };
}