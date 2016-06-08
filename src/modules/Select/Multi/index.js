import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import keycode from 'keycode';
import { without } from 'lodash';
import { pickDiff, focusNode } from 'helpers';
import Icon from 'react-svgcon';
import Option from '../Option';
import Spinner from 'modules/Spinner';
import dropdownIcon from 'icons/dropdown.svg';
import checkIcon from 'icons/check.svg';

export default class MultiSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    loadingLabel: PropTypes.string,
    error: PropTypes.array,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    loading: false,
    fluid: false,
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

  shouldComponentUpdate(nextProps, nextState) {
    const acceptedProps = ['value', 'options', 'placeholder', 'error', 'fluid'];
    const acceptedState = ['focusing', 'selecting'];

    if (
      pickDiff(this.props, nextProps, acceptedProps)
      || pickDiff(this.state, nextState, acceptedState)
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    if (this.state.focusing) this.focus();
  }

  setCurrentValue = value => this.setState({ currentValue: value });

  isReady = () => !(this.props.disabled || this.props.loading);

  focus = () => focusNode(this.refs.dummy);

  beginSelecting = () => this.setState({ selecting: true, focusing: true });

  finishSelecting = () => this.setState({ selecting: false });

  handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleMouseUp = () => {
    if (this.isReady()) {
      if (this.state.selecting) this.finishSelecting();
      else this.beginSelecting();
    }
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
    const { currentValue } = this.state;
    const newValue = currentValue.indexOf(value) === -1
      ? [...currentValue, value]
      : without(currentValue, value);

    this.setCurrentValue(newValue);
    if (this.props.onChange) this.props.onChange(newValue);
  };

  handleSelection = value => {
    this.handleChange(value);
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

  renderLabel() {
    return this.props.name
      ? `${this.state.currentValue.length} ${this.props.name} selected`
      : `${this.state.currentValue.length} selected`;
  }

  renderPlaceholder() {
    return <span className="placeholder">{this.props.placeholder}</span>;
  }

  renderDisplay() {
    if (this.props.loading && !this.props.disabled) {
      return (
        <span className="label">
          <Spinner className="spinner" />
          {this.props.loadingLabel || 'Loading...'}
        </span>
      );
    }

    if (this.props.options && this.props.options.length) {
      return this.state.currentValue
        ? this.renderLabel()
        : this.renderPlaceholder();
    }

    return this.renderPlaceholder();
  }

  renderOptionLabel(text) {
    return (
      <div className="label">
        <Icon className="check icon" path={checkIcon} />
        <span className="text">{text}</span>
      </div>
    );
  }

  renderOptions() {
    if (this.props.options.length) {
      return this.props.options.map(o => (
        <Option
          key={o.value}
          value={o.value}
          label={this.renderOptionLabel(o.label)}
          active={this.state.currentValue.indexOf(o.value) !== -1}
          onSelect={this.handleSelection}
        />
      ));
    }

    return [<Option key="no-options" label="No options available." />];
  }

  renderMenu() {
    if (this.isReady() && this.state.selecting) {
      return (
        <ul className="menu">
          {this.renderOptions()}
        </ul>
      );
    }

    return undefined;
  }

  renderDummy() {
    if (this.isReady()) {
      return (
        <input
          ref="dummy"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />
      );
    }

    return undefined;
  }

  render() {
    const classes = classnames(
      'pui--select',
      'multi',
      this.props.className,
      {
        selecting: this.state.selecting,
        focusing: this.state.focusing,
        disabled: this.props.disabled,
        loading: this.props.loading,
        error: this.props.error,
        fluid: this.props.fluid,
      }
    );

    return (
      <div
        className={classes}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {this.renderDummy()}
        <div className="body">
          <div className="container">
            <div className="display">
              {this.renderDisplay()}
              <Icon className="icon" path={dropdownIcon} />
            </div>
            {this.renderMenu()}
          </div>
        </div>
      </div>
    );
  }
}
