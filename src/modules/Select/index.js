import React, { Component, PropTypes } from 'react';
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
    label: PropTypes.string,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    responsive: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    responsive: true,
  };

  state = {
    focusing: false,
    selecting: false,
    currentValue: undefined,
  };

  componentWillMount() {
    this.setState({ currentValue: this.props.value });
  }

  componentDidMount() {
    this.setValueContainer(this.state.currentValue);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setCurrentValue(nextProps.value);
    }
  }

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

  setValueContainer = value => { this.refs.valueContainer.value = value; }

  setCurrentValue = value => {
    this.setState({ currentValue: value });
    this.setValueContainer(value);
  };

  incrementSelection = inc => {
    const { options } = this.props;
    const currentIndex = options.findIndex(o => o.value === this.state.currentValue);
    const nextIndex = currentIndex + inc;
    let nextOption;

    if (currentIndex === -1 || nextIndex === options.length) nextOption = options[0];
    else if (nextIndex === -1) nextOption = options[options.length - 1];
    else nextOption = options[currentIndex + inc];

    this.setCurrentValue(nextOption.value);
  };

  focus = () => this.refs.valueContainer.focus();

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
    if (!this.state.selecting) this.setState({ focusing: false });
    else this.setState({ selecting: false });
  };

  handleKeyDown = e => {
    const key = keycode(e.which);

    if (key === 'up' || key === 'down') {
      if (!this.state.selecting) {
        this.setState({ selecting: true });
      } else {
        if (key === 'up') this.incrementSelection(-1);
        else this.incrementSelection(1);
      }
    }

    if (key === 'enter') this.finishSelecting();

    if (key === 'tab' && this.state.selecting) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  handleSelect = value => {
    this.setCurrentValue(value);
    if (this.props.onChange) this.props.onChange(value);
    this.finishSelecting();
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
    const classes = classnames(
      'pui--select',
      { responsive: this.props.responsive },
      { selecting: this.state.selecting },
      { focusing: this.state.focusing },
    );

    if (this.state.focusing) this.focus();

    return (
      <div
        className={classes}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <input
          className="value-container"
          ref="valueContainer"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />
        {this.renderLabel()}
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
