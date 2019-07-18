import styled from '@emotion/native';
import { TextInput } from 'react-native';

const Input = styled(TextInput)`
  height: 44;
  align-self: stretch;
  background-color: #eee;
  border-radius: 8px;
  padding: 0 8px;
  margin: 8px 16px 0;
`;
Input.defaultProps = {
  placeholderTextColor: '#666',
  autoCorrect: false,
  autoCapitalize: 'none',
};

export default Input;
