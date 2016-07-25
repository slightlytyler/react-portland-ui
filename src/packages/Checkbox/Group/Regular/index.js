import React, { Component, PropTypes } from 'react';
import Group from '../Base';
import Checkbox from '../../Regular';

export default class CheckboxGroupRegular extends Component {
  static propTypes = {
    error: PropTypes.array,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    value: PropTypes.any,
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
