import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Spinner = ({ className, thin = false }) => {
  const classes = classnames('pui--spinner', className, { thin });

  return <div className={classes} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
  thin: PropTypes.bool,
};

export default Spinner;
