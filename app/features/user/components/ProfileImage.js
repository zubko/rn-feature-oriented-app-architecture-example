import React from 'react';
import styled from '@emotion/native';
import { View, Image, PixelRatio } from 'react-native';

import { Colors } from '@app/core/constants/Theme';

const WIDTH = 200;
const PX = PixelRatio.getPixelSizeForLayoutSize(WIDTH);

export default props => (
  <Container {...props}>
    <ProfileImage source={{ uri: `https://placeimg.com/${PX}/${PX}/people` }} />
  </Container>
);

const ProfileImage = styled(Image)`
  width: ${WIDTH.toString()};
  height: ${WIDTH.toString()};
`;

const Container = styled(View)`
  width: ${WIDTH.toString()};
  height: ${WIDTH.toString()};
  border-radius: ${(WIDTH / 2).toString()}px;
  border-width: 10px;
  border-color: ${Colors.main};
  overflow: hidden;
`;
