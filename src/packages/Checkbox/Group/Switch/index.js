import React, { Component, PropTypes } from 'react';
import Group from '../Base';
import Switch from '../../Switch';

export default class CheckboxGroupSwitch extends Component {
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
    vertical: true,
  };

  render() {
    return (
      <Group component={Switch} {...this.props} />
    );
  }
}
