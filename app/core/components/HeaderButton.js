import React from 'react';
import styled, { css } from '@emotion/native';

import { Colors } from '@app/core/constants/Theme';

import ImageButton from './ImageButton';

const imageDefaultStyle = css`
  tint-color: ${Colors.main};
`;

const StyledButton = styled(ImageButton)`
  width: 32px;
  height: 32px;
  margin-right: 4px;
`;

export default ({ imageStyle, ...props }) => (
  <StyledButton {...props} imageStyle={[imageDefaultStyle, imageStyle]} />
);
