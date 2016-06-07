import React, { Component, PropTypes } from 'react';
import { uniq, without } from 'lodash';
import Checkbox from '../../Regular';

export default class CheckboxGroup extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    error: PropTypes.array,
  };

  handleChange = (value, checked) => {
    const { value: currentValue, onChange } = this.props;

    if (checked) onChange(uniq([...currentValue, value]));
    else onChange(without(currentValue, value));
  };

  renderOption = option => {
    const key = `${this.props.name}-${option.value}`;
    const isChecked = this.props.value.indexOf(option.value) !== -1;
    const handleChange = checked => this.handleChange(option.value, checked);

    return (
      <Checkbox
        key={key}
        name={key}
        value={isChecked}
        onChange={handleChange}
        label={option.label}
        error={this.props.error}
      />
    );
  };

  renderOptions = () => this.props.options.map(this.renderOption);

  render() {
    console.log(this.props.value);
    return (
      <div className="pui--checkbox__group">
        {this.renderOptions()}
      </div>
    );
  }
}
