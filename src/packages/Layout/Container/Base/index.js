import React, { PropTypes } from 'react';
import Box from 'packages/Layout/Box';
import classnames from 'classnames';

const Container = props => (
  <Box {...props} className={classnames('pui--container', props.className)}>
    {props.children}
  </Box>
);

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;

/* eslint-disable react/prop-types */
export const factory = size => props => React.createElement(Container, {
  ...props,
  className: classnames(props.className, size),
});
/* eslint-disable react/prop-types */
