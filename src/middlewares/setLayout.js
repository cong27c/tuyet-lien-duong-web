module.exports = function setLayout(layoutPath) {
  return function (req, res, next) {
    res.locals.layout = layoutPath;
    next();
  };
};
