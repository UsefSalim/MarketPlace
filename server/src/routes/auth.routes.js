const express = require('express');
const User = require('../models/user.models');

const authRoutes = express.Router();
const {
  SuperAdminRegisterController,
  VendeurRegisterController,
  ClientRegisterController,
  loginController,
  logoutController,
} = require('../controllers/auth.controllers');

const { accessedBy } = require('../middlewares/auth.middlewares');

authRoutes.post(
  '/adminregister',
  accessedBy(User, 'SuperAdmin'),
  SuperAdminRegisterController
);
authRoutes.post('/vendeurregister', VendeurRegisterController);
authRoutes.post('/clientregister', ClientRegisterController);
authRoutes.post('/login', loginController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;
