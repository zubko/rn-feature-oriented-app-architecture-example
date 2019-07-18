/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const rootDir = __dirname;

module.exports = {
  resolver: {
    extraNodeModules: {
      '@app/core': path.join(rootDir, 'app', 'core'),
      '@app/features': path.join(rootDir, 'app', 'features'),
    },
    blacklistRE: /^backend\//,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
