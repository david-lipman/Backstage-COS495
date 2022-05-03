// validateEmail returns true if email is valid, or false otherwise.
export const validEmail = (email: string) => {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(email);
};
