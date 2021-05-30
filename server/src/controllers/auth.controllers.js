const { createUser, sendJwtToken, login } = require('../utils/auth');
const User = require('../models/user.models');
const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');

exports.SuperAdminRegisterController = async (req, res) =>
  await createUser(
    req,
    res,
    User,
    registerValidations,
    { email: req.body.email },
    'Admin'
  );
exports.VendeurRegisterController = async (req, res) =>
  await createUser(
    req,
    res,
    User,
    registerValidations,
    { email: req.body.email },
    'Vendeur'
  );
exports.ClientRegisterController = async (req, res) =>
  await createUser(
    req,
    res,
    User,
    registerValidations,
    { email: req.body.email },
    'Client'
  );

exports.loginController = async (req, res) => {
  // All Login
  const { email } = req.body;
  await login(req, res, User, loginValidations, { email });
};
exports.logoutController = (req, res) =>
  res.clearCookie('_token').json({ role: '', isAuthenticated: false });
