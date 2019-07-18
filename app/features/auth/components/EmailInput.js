import React from 'react';
import TextInput from './TextInput';

const Input = props => (
  <TextInput
    keyboardType="email-address"
    autoCompleteType="email"
    placeholder="Enter email"
    {...props}
  />
);

export default Input;
