const exclude = <T, Key extends keyof T>(
  resultSet: T,
  ...keys: Key[]
): Omit<T, Key> => {
  for (const key of keys) {
    delete resultSet[key];
  }
  return resultSet;
};

export default exclude;
