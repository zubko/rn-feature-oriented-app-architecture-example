import * as React from 'react';
import { ActivityIndicator } from 'react-native';

import Container from '@app/core/components/Container';

export default () => {
  return (
    <Container isSafeArea isCentered>
      <ActivityIndicator size="large" />
    </Container>
  );
};
