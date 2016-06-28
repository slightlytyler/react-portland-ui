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

  getOptions = () => {
    const { currentPage, totalPages } = this.props;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const { ellipsis } = this;

    switch (currentPage) {
      case 1:
      case 2:
        return [1, 2, 3, ellipsis, totalPages];

      case totalPages:
      case totalPages - 1:
        return [1, ellipsis, totalPages - 2, totalPages - 1, totalPages];

      default: {
        const before = currentPage - 1;
        const after = currentPage + 1;
        const body = [before, currentPage, after];

        if (before === 3) body.unshift(2);
        else if (before !== 2) body.unshift({ value: ellipsis, key: 'beforeEllipsis' });

        if (after === totalPages - 2) body.push(totalPages - 1);
        else if (after !== totalPages - 1) body.push({ value: ellipsis, key: 'afterEllipsis' });

        return [1, ...body, totalPages];
      }
    }
  };

  ellipsis = 'ellipsis';

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
    const value = typeof option === 'object' ? option.value : option;
    const key = typeof option === 'object' ? option.key : option;
    const isCurrent = value === this.props.currentPage;
    const isEllipsis = value === this.ellipsis;
    const classes = classnames(
      'option',
      {
        current: isCurrent,
        ellipsis: isEllipsis,
      },
    );
    const handleChange = () => (
      !(isCurrent || isEllipsis)
        ? this.props.onChange(value)
        : null
    );
    const label = isEllipsis ? '...' : value;

    return (
      <section key={key} className={classes} onClick={handleChange}>
        {label}
      </section>
    );
  };

  renderOptions = () => this.getOptions().map(this.renderOption);

  render() {
    return (
      <div className="pui--pagination">
        <section className="left arrow option" onClick={this.handlePrevious}>
          <Icon className="icon" svg={leftCaret} />
        </section>
        {this.renderOptions()}
        <section className="right arrow option" onClick={this.handleNext}>
          <Icon className="icon" svg={rightCaret} />
        </section>
      </div>
    );
  }
}
