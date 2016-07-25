import React, { Component, PropTypes } from 'react';
import { attempt } from 'lodash';
import classnames from 'classnames';
import Icon from 'packages/Icon';
import { pickDiff } from 'helpers';

export default class InputBase extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    error: PropTypes.array,
    flat: PropTypes.bool,
    fluid: PropTypes.bool,
    ghost: PropTypes.bool,
    icon: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    thin: PropTypes.bool,
    transparent: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    fluid: false,
    readOnly: false,
    size: 'medium',
  };

  state = {
    focusing: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const acceptedProps = ['className', 'value', 'placeholder', 'error', 'fluid'];

    if (pickDiff(this.props, nextProps, acceptedProps)) return true;

    if (pickDiff(this.state, nextState)) return true;

    return false;
  }

  handleChange = e => attempt(this.props.onChange, e.target.value);

  handleClick = e => attempt(this.props.onClick, e);

  handleFocus = () => this.setState({ focusing: true });

  handleBlur = () => this.setState({ focusing: false });

  renderIcon = () => {
    if (this.props.icon) {
      return <Icon className="icon" svg={this.props.icon} />;
    }

    return undefined;
  };

  renderDummy = () => {
    const content = this.props.value
      || <span className="placeholder">{this.props.placeholder}</span>;

    return (
      <div className="dummy">
        {content}
      </div>
    );
  };

  renderInput = () => {
    if (!this.props.readOnly) {
      return (
        <input
          type={this.props.type}
          value={this.props.value === null ? '' : this.props.value}
          defaultValue={this.props.defaultValue}
          onChange={this.handleChange}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
        />
      );
    }

    return this.renderDummy();
  };

  render() {
    const classes = classnames(
      'pui--input',
      this.props.className,
      `size--${this.props.size}`,
      {
        focusing: this.state.focusing,
        error: this.props.error,
        flat: this.props.flat,
        fluid: this.props.fluid,
        ghost: this.props.ghost,
        thin: this.props.thin,
        transparent: this.props.transparent,
      },
    );

    return (
      <div className={classes} onClick={this.handleClick}>
        {this.renderIcon()}
        {this.renderInput()}
        {this.props.children}
      </div>
    );
  }
}
