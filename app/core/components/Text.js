import styled from '@emotion/native';
import { Text } from 'react-native';

import { Fonts, Colors } from '@app/core/constants/Theme';

export const H1 = styled(Text)`
  font-size: ${Fonts.h1};
  font-weight: 500;
  color: ${Colors.text};
`;

export const H2 = styled(Text)`
  font-size: ${Fonts.h2};
  color: ${Colors.text};
`;

export const NormalText = styled(Text)`
  font-size: ${Fonts.normal};
  color: ${Colors.text};
`;

export const SecondaryText = styled(Text)`
  font-size: ${Fonts.secondary};
  color: ${Colors.textSubtle};
`;
