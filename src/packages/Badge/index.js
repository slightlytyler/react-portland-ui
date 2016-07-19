import React, { PropTypes } from 'react';

const Badge = ({ children, text }) => (
  <div className="pui--badge">
    {text || children}
  </div>
);

Badge.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};

export default Badge;
