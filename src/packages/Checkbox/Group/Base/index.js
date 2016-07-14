import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { uniq, without } from 'lodash';

export default class CheckboxGroupBase extends Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    valueByKey: PropTypes.bool,
    error: PropTypes.array,
    vertical: PropTypes.bool,
    labelGetter: PropTypes.func,
  };

  static defaultProps = {
    valueByKey: false,
  };

  valueByKey = () => this.props.valueByKey || !Array.isArray(this.props.value);

  handleChange = (value, checked) => {
    const { value: currentValue, onChange } = this.props;

    if (onChange) {
      if (this.valueByKey()) {
        if (checked) onChange({ ...currentValue, [value]: true });
        else onChange({ ...currentValue, [value]: false });
      } else {
        if (checked) onChange(uniq([...currentValue, value]));
        else onChange(without(currentValue, value));
      }
    }
  };

  renderOption = (option, index) => {
    const key = `${this.props.name}-${option.value}`;
    const isChecked = () => {
      if (this.props.value) {
        if (this.valueByKey()) return !!this.props.value[option.value];
        return this.props.value.indexOf(option.value) !== -1;
      }

      return false;
    };
    const handleChange = checked => this.handleChange(option.value, checked);

    return React.createElement(this.props.component, {
      key,
      name: key,
      value: isChecked(),
      onChange: handleChange,
      label: option.label,
      error: this.props.error,
      labelComponent: this.props.labelGetter
       ? this.props.labelGetter({ option, index })
       : undefined,
    });
  };

  renderOptions = () => this.props.options.map(this.renderOption);

  render() {
    const classes = classnames('pui--checkbox__group', this.props.className, {
      vertical: this.props.vertical,
    });

    return (
      <div className={classes}>
        {this.renderOptions()}
      </div>
    );
  }
}
