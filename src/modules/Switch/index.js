import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
    toggling: false,
  };

  handleChange = e => this.props.onChange(e.target.checked);

  handleFocus = () => this.setState({ focusing: true });

  handleBlur = () => {
    if (!this.state.toggling) this.setState({ focusing: false });
  };

  handleMouseDown = () => this.setState({ toggling: true });

  handleMouseUp = () => this.setState({ toggling: false });

  renderKnob() {
    if (this.props.square) {
      return (
        <div className="knob">
          <Icon className="check icon" path={checkIcon} color="currentColor" />
          <Icon className="close icon" path={closeIcon} color="currentColor" />
        </div>
      );
    }

    return [
      <div key="knob" className="knob" />,
      <Icon key="check" className="check icon" path={checkIcon} color="currentColor" />,
      <Icon key="close" className="close icon" path={closeIcon} color="currentColor" />,
    ];
  }

  render() {
    const classes = classnames(
      'pui--switch',
      {
        focusing: this.state.focusing,
        square: this.props.square,
        regular: !this.props.square,
      }
    );

    return (
      <div className={classes}>
        <input
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
