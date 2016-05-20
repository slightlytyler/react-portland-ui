import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import keycode from 'keycode';
import Option from './Option';

export default class Select extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    placeholder: PropTypes.string,
    fluid: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    fluid: true,
  };

  state = {
    focusing: false,
    selecting: false,
    currentValue: undefined,
  };

  componentWillMount() {
    this.setCurrentValue(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setCurrentValue(nextProps.value);
    }
  }

  componentDidUpdate() {
    if (this.state.focusing) this.focus();
  }

  setCurrentValue = value => this.setState({ currentValue: value });

  getLabelForOption = value => {
    const option = this.props.options.find(o => o.value === value);
    return option.label || option.value;
  };

  focus = () => findDOMNode(this.refs.dummy).focus();

  beginSelecting = () => this.setState({ selecting: true, focusing: true });

  finishSelecting = () => this.setState({ selecting: false });

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleMouseUp = () => {
    if (this.state.selecting) this.finishSelecting();
    else this.beginSelecting();
  };

  handleFocus = () => this.setState({ focusing: true });

  handleBlur = () => {
    if (this.state.selecting) this.setState({ selecting: false });
    else this.setState({ focusing: false });
  };

  handleKeyDown = e => {
    const key = keycode(e.which);
    const cancelEvent = () => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (key === 'up' || key === 'down') {
      if (!this.state.selecting) {
        this.setState({ selecting: true });
      } else {
        if (key === 'up') this.handleIncrementSelection(-1);
        else this.handleIncrementSelection(1);
      }
    }

    if (key === 'enter' && this.state.selecting) {
      cancelEvent();
      this.finishSelecting();
    }

    if (key === 'tab' && this.state.selecting) cancelEvent();
  };

  handleChange = value => {
    this.setCurrentValue(value);
    if (this.props.onChange) this.props.onChange(value);
  };

  handleSelection = value => {
    this.handleChange(value);
    this.finishSelecting();
  };

  handleIncrementSelection = inc => {
    const { options } = this.props;
    const currentIndex = options.findIndex(o => o.value === this.state.currentValue);
    const nextIndex = currentIndex + inc;
    let nextOption;

    if (currentIndex === -1 || nextIndex === options.length) nextOption = options[0];
    else if (nextIndex === -1) nextOption = options[options.length - 1];
    else nextOption = options[currentIndex + inc];

    this.handleChange(nextOption.value);
  };

  renderPlaceholder() {
    return <span className="placeholder">{this.props.placeholder}</span>;
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
        onSelect={this.handleSelection}
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
    const classes = classnames(
      'pui--select',
      { fluid: this.props.fluid },
      { selecting: this.state.selecting },
      { focusing: this.state.focusing },
    );

    return (
      <div
        className={classes}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <input
          className="value-container"
          ref="dummy"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />
        <div className="input">
          <div className="container">
            <div className="display">
              {this.renderDisplay()}
            </div>
            {this.renderMenu()}
          </div>
        </div>
      </div>
    );
  }
}
