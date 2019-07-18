import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

import { Colors, Fonts } from '@app/core/constants/Theme';

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.main};
  border-radius: 8px;
  padding: 12px 16px;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

const Label = styled(Text)`
  color: white;
  font-size: ${Fonts.button};
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  margin-right: 8px;
`;
StyledActivityIndicator.defaultProps = {
  color: 'white',
};

export default ({ isInProgress, type, title, onPress, ...otherProps }) => (
  <Container onPress={onPress} title={title} {...otherProps}>
    {isInProgress ? <StyledActivityIndicator /> : null}
    <Label>{title}</Label>
  </Container>
);
