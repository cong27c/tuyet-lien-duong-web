// services/auth.service.js
const usersModel = require("../model/users.model");
const bcrypt = require("bcrypt");

class AuthService {
  async login({ email, password }) {
    const user = await usersModel.findByEmail(email);

    if (!user) throw new Error("Sai email hoặc mật khẩu");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Sai email hoặc mật khẩu");

    return user;
  }
}

module.exports = new AuthService();
