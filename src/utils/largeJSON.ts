export default () => {
  const heavyArray = new Array(10000).fill(0);
  const obj = heavyArray.reduce((acc, data, i) => {
    const l = { [i + i]: data };
    return { ...acc, [i]: l };
  }, {});
  return obj;
};
