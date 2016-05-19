import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Option from './Option';

export default class Select extends Component {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    children: PropTypes.node,
  };

  state = {
    selecting: false,
    currentValue: undefined,
  };

  getPlaceholder = () => {
    if (this.props.placeholder) {
      const placeholder = typeof this.props.placeholder === 'string'
        ? this.props.placeholder
        : this.props.label;

      return placeholder;
    }

    return undefined;
  };

  getLabelForOption = value => {
    const option = this.props.options.find(o => o.value === value);
    return option.label || option.value;
  };

  setCurrentValue = value => {
    this.setState({ currentValue: value });
    this.refs.valueContainer.value = value;
  };

  handleClick = () => {
    if (!this.state.selecting) this.setState({ selecting: true });
  };

  handleFocus = () => this.setState({ selecting: true });

  handleBlur = () => this.setState({ selecting: false });

  handleSelect = value => {
    this.setCurrentValue(value);
    this.setState({ selecting: false });
  };

  renderLabel() {
    if (this.props.label) {
      return <label className="label">{this.props.label}</label>;
    }

    return undefined;
  }

  renderPlaceholder() {
    return <span className="placeholder">{this.getPlaceholder()}</span>;
  }

  renderDisplay() {
    return this.state.currentValue
      ? this.getLabelForOption(this.state.currentValue)
      : this.renderPlaceholder();
  }

  renderOptions() {
    return this.props.options.map(o => (
      <Option
        key={o.value}
        value={o.value}
        label={o.label}
        active={o.value === this.state.currentValue}
        onSelect={this.handleSelect}
      />
    ));
  }

  renderMenu() {
    if (this.state.selecting) {
      return (
        <ul className="menu">
          {this.renderOptions()}
        </ul>
      );
    }

    return undefined;
  }

  render() {
    const classes = classnames('pui--select', { active: this.state.selecting });

    return (
      <div className={classes} onClick={this.handleClick}>
        <input
          className="value-container"
          ref="valueContainer"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderLabel()}
        <div className="input">
          <div className="display">
            {this.renderDisplay()}
          </div>
          {this.renderMenu()}
        </div>
      </div>
    );
  }
}
