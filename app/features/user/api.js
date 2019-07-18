import { get, patch } from '@app/core/services/userApi';

export async function getUser(api, id) {
  return get(api, 'users', id);
}

export async function patchUser(api, id, data) {
  return patch(api, 'users', id, data);
}
