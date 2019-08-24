module.exports.genUID = function() {
  return (
    Math.random()
      .toString(16)
      .substring(2) +
    Math.random()
      .toString(16)
      .substring(2) +
    Math.random()
      .toString(16)
      .substring(2) +
    Math.random()
      .toString(16)
      .substring(2)
  );
};
