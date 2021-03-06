import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import keycode from 'keycode';
import { pickDiff, focusNode } from 'helpers';
import Icon from 'packages/Icon';
import Option from '../Option';
import Spinner from 'packages/Spinner';
import { caretDown } from 'icons';

export default class BaseSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.array,
    fluid: PropTypes.bool,
    loading: PropTypes.bool,
    loadingLabel: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    placeholder: PropTypes.string,
    value: PropTypes.string,
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
    if (
      this.state.currentValue
      && !nextProps.options.find(option => option.value === this.state.currentValue)
    ) {
      this.setCurrentValue(undefined);
    } else if (this.props.value !== nextProps.value) {
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

  additionalClassNames = [];

  isReady = () => !(this.props.disabled || this.props.loading);

  focus = () => focusNode(this.refs.dummy);

  beginSelecting = () => this.setState({ selecting: true, focusing: true });

  finishSelecting = () => this.setState({ selecting: false });

  handleMouseDown = e => {
    if (this.state.selecting) {
      e.preventDefault();
      e.stopPropagation();
    }
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

  renderLabel = () => {
    const option = this.props.options.find(o => o.value === this.state.currentValue);
    return option.label || option.value;
  };

  renderPlaceholder = () => (
    <span className="placeholder">{this.props.placeholder}</span>
  );

  renderDisplay = () => {
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
  };

  renderOptionLabel = label => label;

  renderOptionIsActive = value => this.state.currentValue === value;

  renderEmptyOption = () => [<Option key="no-options" label="No options available." />];

  renderOption = option => (
    <Option
      key={option.value}
      value={option.value}
      label={this.renderOptionLabel(option.label)}
      active={this.renderOptionIsActive(option.value)}
      onSelect={this.handleSelection}
    />
  );

  renderOptions = () => {
    if (this.props.options.length) {
      return this.props.options.map(this.renderOption);
    }

    return this.renderEmptyOption();
  };

  renderMenu = () => {
    if (this.isReady() && this.state.selecting) {
      return (
        <ul className="menu">
          {this.renderOptions()}
        </ul>
      );
    }

    return undefined;
  };

  renderDummy = () => {
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
  };

  render() {
    const classes = classnames(
      'pui--select',
      this.props.className,
      ...this.additionalClassNames,
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
              <Icon className="icon" svg={caretDown} />
            </div>
            {this.renderMenu()}
          </div>
        </div>
      </div>
    );
  }
}
