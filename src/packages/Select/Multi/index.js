import React, { PropTypes } from 'react';
import { without } from 'lodash';
import Icon from 'react-svgcon';
import Base from '../Base';
import checkIcon from 'icons/check.svg';

export default class MultiSelect extends Base {
  static propTypes = {
    value: PropTypes.array,
  };

  additionalClassNames = ['multi'];

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

  renderOptionLabel = label => (
    <div className="label">
      <Icon className="check icon" svg={checkIcon} />
      <span className="text">{label}</span>
    </div>
  );

  renderOptionIsActive = value => this.state.currentValue.indexOf(value) !== -1;

  renderLabel = () => (
    this.props.name
      ? `${this.state.currentValue.length} ${this.props.name} selected`
      : `${this.state.currentValue.length} selected`
  );
}
