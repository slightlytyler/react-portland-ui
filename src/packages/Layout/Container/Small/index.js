import React, { PropTypes } from 'react';
import Container from '../Base';

const SmallContainer = props => (
  <Container width="30em" margin="0 auto" {...props}>
    {props.children}
  </Container>
);

SmallContainer.propTypes = {
  children: PropTypes.node,
};

export default SmallContainer;
