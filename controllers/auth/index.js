const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const refreshToken = require("./refreshToken");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  googleAuth,
  googleRedirect,
  refreshToken
};
