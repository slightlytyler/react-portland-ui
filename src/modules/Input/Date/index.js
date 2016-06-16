import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import Input from '../Base';
import { calendar } from 'icons';

export default class DateInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.array,
    fluid: PropTypes.bool,
  };

  state = {
    show: false,
  };

  handleChange = date => {
    this.props.onChange(date);
    this.setState({ show: !this.state.show });
  };

  handleClick = () => this.setState({ show: !this.state.show });

  handleCalendarClick = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const classes = classnames('pui--input--date', this.props.className, {
      show: this.state.show,
    });
    const today = new Date();
    const stringValue = this.props.value
      ? moment(this.props.value).format('MMMM Do, YYYY')
      : undefined;

    return (
      <Input
        className={classes}
        value={stringValue}
        placeholder={this.props.placeholder}
        icon={calendar}
        error={this.props.error}
        fluid={this.props.fluid}
        onClick={this.handleClick}
        readOnly
      >
        <InfiniteCalendar
          className="calendar"
          selectedDate={this.props.value}
          onSelect={this.handleChange}
          onClick={this.handleCalendarClickc}
          width="100%"
          height={250}
          minDate={today}
          keyboardSupport
        />
      </Input>
    );
  }
}
