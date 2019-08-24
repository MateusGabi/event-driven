module.exports.genRandomPort = function() {
  return Math.ceil(Math.random() * 10000 + 3000);
};

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
