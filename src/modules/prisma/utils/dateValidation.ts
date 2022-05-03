// validDate returns true if date is valid, or false otherwise.
export const validDate = (date: string) => {
  const d = new Date(date);
  if (isNaN(d.valueOf()) || d.toString() === "Invalid Date") {
    return false;
  }
  return true;
};

// pastDate returns true if date is a past Date, or false otherwise.
export const pastDate = (date: Date) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return date < today;
};
