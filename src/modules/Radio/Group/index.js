import React, { Component, PropTypes } from 'react';
import RadioButton from '../Button';

export default class RadioGroup extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
  };

  renderOptions = () => this.props.options.map(o => (
    <RadioButton
      key={o.value}
      value={o.value}
      onChange={this.props.onChange}
      checked={o.value === this.props.value}
      label={o.label}
    />
  ));

  render() {
    return (
      <div>
        {this.renderOptions()}
      </div>
    );
  }
}
