export const shuffle = (arr) => {
  let i = arr.length,
    j;
  for (; --i; ) {
    [arr[i], arr[j]] = [arr[(j = Math.floor(Math.random() * i))], arr[i]];
  }
  return arr;
};

export const parseTime = (time) => {
  const hh = ("0" + Math.round(time / 3600)).slice(-2);
  const mm = ("0" + Math.round((time % 3600) / 60)).slice(-2);
  const ss = ("0" + Math.round(time % 60)).slice(-2);
  return [hh, mm, ss];
};
