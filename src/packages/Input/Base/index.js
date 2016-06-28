import React, { Component, PropTypes } from 'react';
import { attempt } from 'lodash';
import classnames from 'classnames';
import Icon from 'packages/Icon';
import { pickDiff } from 'helpers';

export default class InputBase extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    icon: PropTypes.string,
    readOnly: PropTypes.bool,
    error: PropTypes.array,
    fluid: PropTypes.bool,
    ghost: PropTypes.bool,
    thin: PropTypes.bool,
  };

  static defaultProps = {
    fluid: false,
    readOnly: false,
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

  handleChange = e => {
    if (this.props.onChange) this.props.onChange(e.target.value);
  };

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
          value={this.props.value}
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
      {
        focusing: this.state.focusing,
        error: this.props.error,
        fluid: this.props.fluid,
        ghost: this.props.ghost,
        thin: this.props.thin,
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
