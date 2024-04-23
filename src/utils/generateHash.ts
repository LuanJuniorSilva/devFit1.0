export const generateHash = () => {
  const data = new Date();

  return data.getTime().toString();
};
