import React from 'react';
import styled from '@emotion/native';

import { TouchableOpacity, Text } from 'react-native';

import { Colors } from '@app/core/constants/Theme';

const Container = styled(TouchableOpacity)`
  background-color: ${Colors.main};
  width: 96px;
  height: 96px;
  border-radius: 48px;
  justify-content: center;
  align-items: center;
`;

const Label = styled(Text)`
  color: white;
  font-size: 20px;
`;

export default ({ onPress, title, ...otherProps }) => (
  <Container onPress={onPress} {...otherProps}>
    <Label>{title}</Label>
  </Container>
);
