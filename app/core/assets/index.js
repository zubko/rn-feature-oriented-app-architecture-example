/* eslint-disable global-require */

export function getAsset(id) {
  switch (id) {
    case 'check':
      return require('./check.png');
    case 'error':
      return require('./error.png');
    case 'user':
      return require('./user.png');
    default:
      return null;
  }
}

export default { getAsset };
