import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Spinner = ({ className }) => {
  const classes = classnames('pui--spinner', className);

  return <div className={classes} />;
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
