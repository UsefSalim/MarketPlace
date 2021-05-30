const express = require('express');
const User = require('../models/user.models');

const authRoutes = express.Router();
const {
  SuperAdminRegisterController,
  loginController,
  logoutController,
} = require('../controllers/auth.controllers');

const { accessedBy } = require('../middlewares/auth.middlewares');

authRoutes.post(
  '/adminRegister',
  accessedBy(User, 'SuperAdmin'),
  SuperAdminRegisterController
);
authRoutes.post('/login', loginController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;
