export const loadSavedValues = (key) =>
  ((storedData) => (storedData ? JSON.parse(storedData) : undefined))(
    localStorage.getItem(key)
  );

export const saveRecord = (key, record) =>
  localStorage.setItem(key, JSON.stringify(record));

export const savedSetting = (key, value) => localStorage.setItem(key, value);
