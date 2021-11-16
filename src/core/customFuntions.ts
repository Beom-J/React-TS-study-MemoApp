export const makeRandomString = () => {
  const randomString =
    Math.random().toString(20).substring(2, 10) +
    Math.random().toString(20).substring(2, 10);
  return randomString;
};
