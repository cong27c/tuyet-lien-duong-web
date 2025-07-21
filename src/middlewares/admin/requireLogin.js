const LOGIN_PATH = "/admin/login-3f17eac0-9325-41f2-a9da-cf8b08755a27";

function requireLogin(req, res, next) {
  const userId = req.session.get("userId");
  const url = req.originalUrl;

  if (url.startsWith(LOGIN_PATH)) {
    return next();
  }

  if (userId) {
    return next();
  }
  return res.status(404).render("not-found", {
    layout: "layouts/notFound",
  });
}

module.exports = requireLogin;
