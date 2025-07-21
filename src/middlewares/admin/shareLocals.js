const usersService = require("../../services/user.service");

async function shareLocals(req, res, next) {
  const userId = req.session.get("userId");
  res.locals.auth = null;

  if (userId) {
    const user = await usersService.getById(userId);
    if (user) {
      res.locals.auth = user;
    }
  }
  res.locals.flashes = res.locals.getFlashes?.() || {};

  next();
}

module.exports = shareLocals;
