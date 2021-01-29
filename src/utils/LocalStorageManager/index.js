export const loadSavedValues = (key) => JSON.parse(localStorage.getItem(key));

export const saveRecord = (key, record) =>
  localStorage.setItem(key, JSON.stringify(record));

export const savedSetting = (key, value) => localStorage.setItem(key, value);
