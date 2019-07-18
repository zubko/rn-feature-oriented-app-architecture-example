import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import styled from '@emotion/native';

import { Colors, Fonts } from '@app/core/constants/Theme';

const Label = styled(Text)`
  color: ${Colors.main};
  font-size: ${Fonts.button};
`;

const Touchable = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  margin-right: 4px;
`;

export default ({
  isInProgress,
  type,
  title,
  onPress,
  labelStyle,
  disabled,
  icon,
  iconStyle,
  style,
  ...otherProps
}) => (
  <Touchable
    onPress={onPress}
    title={title}
    disabled={disabled}
    style={[{ opacity: disabled ? 0.5 : 1 }, style]}
    {...otherProps}
  >
    {isInProgress ? <StyledActivityIndicator /> : null}
    {icon ? <Image source={icon} style={iconStyle} /> : null}
    <Label style={labelStyle} disabled={disabled}>
      {title}
    </Label>
  </Touchable>
);
