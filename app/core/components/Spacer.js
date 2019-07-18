import React from 'react';
import { View } from 'react-native';

export default ({ ratioOfFreeSpaceAtTop, children, ...otherProps }) => (
  <View
    style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }}
    {...otherProps}
  >
    <View style={{ flex: ratioOfFreeSpaceAtTop }} />
    {children}
    <View style={{ flex: 1 }} />
  </View>
);
