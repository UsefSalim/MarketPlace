const { createUser, sendJwtToken, login } = require('../utils/auth');
const User = require('../models/user.models');
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');

exports.SuperAdminRegisterController = async (req, res) => {
  const { email } = req.body;
  const newUser = await createUser(
    req,
    res,
    User,
    registerValidations,
    { email },
    'Admin'
  );
  console.log(newUser);
  newUser && sendJwtToken(res, 201, newUser);
};
exports.loginController = async (req, res) => {
  const { email } = req.body;
  await login(req, res, User, loginValidations, { email });
};
exports.logoutController = (req, res) =>
  res.clearCookie('_token').json({ role: '', isAuthenticated: false });
