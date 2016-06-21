import React, { PropTypes } from 'react';
import Input from '../Base';

const PasswordInput = props => <Input type="password" {...props} />;

PasswordInput.propTypes = {
  value: PropTypes.string,
};

export default PasswordInput;
