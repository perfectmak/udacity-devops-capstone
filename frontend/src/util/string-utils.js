export const nullNoop = (fn) => (value) => {
  if (!value) {
    return value;
  }

  return fn(value);
}

export const firstCharToUpperCase = nullNoop((str) => {
  let [s, ...other] = str;

  return [s.toUpperCase(), ...other].join('');
});
