import AsyncStorage from '@react-native-community/async-storage';

export function get(key) {
  return AsyncStorage.getItem(key).then(value => {
    const jsonValue = JSON.parse(value);
    return jsonValue;
  });
}

export function set(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export function remove(key) {
  return AsyncStorage.removeItem(key);
}

export default { get, set, remove };
