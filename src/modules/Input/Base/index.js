import React, { Component, PropTypes } from 'react';
import { attempt } from 'lodash';
import classnames from 'classnames';
import Icon from 'react-svgcon';
import { pickDiff } from 'helpers';

export default class InputBase extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.array,
    fluid: PropTypes.bool,
    readOnly: PropTypes.bool,
    onClick: PropTypes.func,
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
      return <Icon className="icon" path={this.props.icon} />;
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
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
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
        error: this.props.error,
        fluid: this.props.fluid,
        focusing: this.state.focusing,
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
