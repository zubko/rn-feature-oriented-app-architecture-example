import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacity, Image } from 'react-native';

const Container = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

export default ({ source, imageStyle, onPress, ...otherProps }) => (
  <Container onPress={onPress} {...otherProps}>
    <Image source={source} style={imageStyle} />
  </Container>
);
