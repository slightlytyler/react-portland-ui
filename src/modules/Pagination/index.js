import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from 'react-svgcon';
import leftCaret from 'icons/caret--left.svg';
import rightCaret from 'icons/caret--right.svg';

export default class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  getOptions = () => [1, 2, 3, 4, 'ellipsis', 8];

  handlePrevious = () => {
    if (this.props.currentPage > 1) {
      this.props.onChange(this.props.currentPage - 1);
    }
  };

  handleNext = () => {
    if (this.props.currentPage < this.props.totalPages) {
      this.props.onChange(this.props.currentPage + 1);
    }
  };

  renderOption = option => {
    const isCurrent = option === this.props.currentPage;
    const isEllipsis = option === 'ellipsis';
    const classes = classnames(
      'option',
      {
        current: isCurrent,
        ellipsis: isEllipsis,
      },
    );
    const handleChange = () => (
      !(isCurrent || isEllipsis)
        ? this.props.onChange(option)
        : null
    );
    const label = isEllipsis ? '...' : option;

    return (
      <section key={option} className={classes} onClick={handleChange}>
        {label}
      </section>
    );
  };

  renderOptions = () => this.getOptions().map(this.renderOption);

  render() {
    return (
      <div className="pui--pagination">
        <section className="left arrow option" onClick={this.handlePrevious}>
          <Icon className="icon" path={leftCaret} />
        </section>
        {this.renderOptions()}
        <section className="right arrow option" onClick={this.handleNext}>
          <Icon className="icon" path={rightCaret} />
        </section>
      </div>
    );
  }
}
