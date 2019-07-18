import R from 'ramda';

export function mapAllToUndefined(object) {
  return R.map(() => undefined, object);
}

export function randomRange(from, to) {
  return from + Math.floor(Math.random() * (to - from));
}

export function shuffled(array) {
  const result = [...array];
  const last = array.length - 1;
  for (let index = 0; index < array.length; index += 1) {
    const rand = randomRange(index, last);
    const temp = result[index];
    result[index] = result[rand];
    result[rand] = temp;
  }
  return result;
}

export default { mapAllToUndefined, shuffled, randomRange };
