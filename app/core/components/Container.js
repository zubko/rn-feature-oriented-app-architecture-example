import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { css } from '@emotion/native';

const defaultStyle = ({ isCentered }) => css`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: ${isCentered ? 'center' : 'flex-start'};
`;

export default props => {
  const { isSafeArea, style, ...otherProps } = props;
  const Component = isSafeArea ? SafeAreaView : View;
  return <Component style={[defaultStyle(props), style]} {...otherProps} />;
};
