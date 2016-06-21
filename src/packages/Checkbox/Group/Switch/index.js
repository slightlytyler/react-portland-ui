import React, { Component, PropTypes } from 'react';
import Group from '../Base';
import Switch from '../../Switch';

export default class CheckboxGroupSwitch extends Component {
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
    vertical: true,
  };

  render() {
    return (
      <Group component={Switch} {...this.props} />
    );
  }
}
