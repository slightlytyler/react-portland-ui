import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Panel = ({ children, className }) => (
  <div className={classnames('pui--panel', className)}>
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Panel;
