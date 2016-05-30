import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from 'react-svgcon';
import { pickDiff } from 'helpers';

export default class InputBase extends Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.array,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    fluid: true,
  };

  state = {
    focusing: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const acceptedProps = ['value', 'placeholder', 'error', 'fluid'];

    if (pickDiff(this.props, nextProps, acceptedProps)) return true;

    if (pickDiff(this.state, nextState)) return true;

    return false;
  }

  handleChange = e => this.props.onChange(e.target.value);

  handleFocus = () => this.setState({ focusing: true });

  handleBlur = () => this.setState({ focusing: false });

  renderIcon = () => {
    if (this.props.icon) {
      return <Icon className="icon" path={this.props.icon} />;
    }

    return undefined;
  };

  render() {
    const classes = classnames(
      'pui--input',
      {
        error: this.props.error,
        fluid: this.props.fluid,
        focusing: this.state.focusing,
      },
    );

    return (
      <div className={classes}>
        {this.renderIcon()}
        <input
          type={this.props.type}
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}
