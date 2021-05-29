const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ennum: ['SuperAdmin', 'Admin', 'Vendeur'],
    required: true,
  },
  type_vendeur: {
    type: String,
    ennum: ['Starter', 'Pro', 'Expert'],
    default: 'Starter',
  },
});

userSchema.path('type_vendeur').required(function () {
  return this.type_vendeur === 'Vendeur';
}, 'vous devez choisir le type de vendeur');

module.exports = model('user', userSchema);
