import React from 'react';
import TextInput from './TextInput';

const Input = props => (
  <TextInput
    autoCompleteType="password"
    placeholder="Enter password"
    secureTextEntry
    {...props}
  />
);

export default Input;
