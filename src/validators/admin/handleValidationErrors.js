const { validationResult } = require("express-validator");

function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().reduce((errors, error) => {
    errors[error.path] = error.msg;
    return errors;
  }, {});

  res.render(res.view, {
    old: req.body,
    story: req.story || {},
    errors,
  });
}

module.exports = handleValidationErrors;
