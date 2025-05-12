export const disabledDate = (current) => {
  const today = new Date();
  return current && current > today;
};
