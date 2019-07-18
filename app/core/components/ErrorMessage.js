import React from 'react';
import { Text } from 'react-native';
import styled from '@emotion/native';

import { Fonts } from '@app/core/constants/Theme';

const StyledText = styled(Text)`
  font-size: ${Fonts.normal};
  color: red;
`;

export default ({ error, ...otherProps }) =>
  error ? (
    <StyledText {...otherProps}>
      {typeof error === 'string' ? error : error.message}
    </StyledText>
  ) : null;
