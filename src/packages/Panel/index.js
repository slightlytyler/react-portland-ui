import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Panel = ({ children, className, fluid }) => (
  <div
    className={classnames('pui--panel', className, { fluid })}
  >
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fluid: PropTypes.bool,
};

export default Panel;
