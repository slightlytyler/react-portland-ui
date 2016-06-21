import React, { Component, PropTypes } from 'react';
import Group from '../Base';
import Checkbox from '../../Regular';

export default class CheckboxGroupRegular extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    error: PropTypes.array,
    vertical: PropTypes.bool,
  };

  static defaultProps = {
    vertical: false,
  };

  render() {
    return (
      <Group component={Checkbox} {...this.props} />
    );
  }
}
