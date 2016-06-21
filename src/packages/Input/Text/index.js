import React, { PropTypes } from 'react';
import Input from '../Base';

const TextInput = props => <Input type="text" {...props} />;

TextInput.propTypes = {
  value: PropTypes.string,
};

export default TextInput;
