const authService = require("../../services/auth.service");
const sessionModel = require("../../model/session.model");

exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login", {
    layout: "admin/auth/login",
    old: {},
    error: null,
  });
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login({
      email: req.body.email,
      password: req.body.password,
    });

    await req.session.set("userId", user.id);

    res.redirect("/admin/stories");
  } catch (error) {
    res.render("admin/auth/login", {
      layout: "admin/auth/login",
      error: error.message,
      old: { email: req.body.email },
    });
  }
};

exports.logout = async (req, res) => {
  const sid = req.cookies.sid;

  if (sid) {
    await sessionModel.remove(sid);
    res.setHeader(
      "Set-Cookie",
      "sid=; path=/; httpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
  }

  res.redirect("/admin/login-3f17eac0-9325-41f2-a9da-cf8b08755a27");
};
