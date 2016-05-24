import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import pickDiff from 'helpers/pickDiff';
import Icon from 'react-svgcon';
import checkIcon from 'icons/check.svg';
import closeIcon from 'icons/close.svg';

export default class Switch extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    square: PropTypes.bool,
  };

  static defaultProps = {
    square: false,
  };

  state = {
    focusing: false,
    active: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const acceptedProps = ['value', 'square'];
    const acceptedState = ['focusing'];

    if (
      pickDiff(this.props, nextProps, acceptedProps)
      || pickDiff(this.state, nextState, acceptedState)
    ) {
      return true;
    }

    return false;
  }

  focus = () => findDOMNode(this.refs.dummy).focus();

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

  renderKnob() {
    if (this.props.square) {
      return (
        <div className="knob">
          <Icon className="check icon" path={checkIcon} />
          <Icon className="close icon" path={closeIcon} />
        </div>
      );
    }

    return [
      <div key="knob" className="knob" />,
      <Icon key="check" className="check icon" path={checkIcon} />,
      <Icon key="close" className="close icon" path={closeIcon} />,
    ];
  }

  render() {
    const classes = classnames(
      'pui--switch',
      {
        focusing: this.state.focusing || this.state.active,
        square: this.props.square,
        regular: !this.props.square,
      }
    );

    return (
      <div className={classes}>
        <input
          ref="dummy"
          id={this.props.name}
          type="checkbox"
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <label
          htmlFor={this.props.name}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {this.renderKnob()}
        </label>
      </div>
    );
  }
}
