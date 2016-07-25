import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import RadioButton from '../Button';

export default class RadioGroup extends Component {
  static propTypes = {
    error: PropTypes.array,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
    })),
    value: PropTypes.string,
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
    const classes = classnames('pui--radio__group', { error: this.props.error });

    return (
      <div className={classes}>
        {this.renderOptions()}
      </div>
    );
  }
}
