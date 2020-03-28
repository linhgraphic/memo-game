export const shuffle = arr => {
  let i = arr.length,
    j;
  for (; --i; ) {
    [arr[i], arr[j]] = [arr[(j = Math.floor(Math.random() * i))], arr[i]];
  }
  return arr;
};
