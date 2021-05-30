const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'nom obligatoire'],
    minLength: [2, 'le nom doit contenir 2 catactére minimum'],
    maxLength: [48, 'le nom ne doit pas depasser 48caractére'],
  },
  email: {
    type: String,
    required: [true, 'email obligatoire'],
    validate: [validator.isEmail, 'please provide a valide email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'le mots de pass doit contenir 6 catactére minimum'],
    maxLength: [1024, 'le nom ne doit pas depasser 1024caractére'],
  },
  role: {
    type: String,
    ennum: {
      values: ['SuperAdmin', 'Admin', 'Vendeur', 'Client'],
      message: '{VALUE} non supperté',
    },
    required: true,
    default: 'Client',
  },
  type_vendeur: {
    type: String,
    ennum: {
      values: ['Starter', 'Pro', 'Expert'],
      message: '{VALUE} non supporté',
    },
  },
  id_fiscale: {
    type: String,
  },
  nombre_article: {
    type: Number,
  },
  actived: {
    type: Boolean,
  },
});
userSchema.pre(['updateOne', 'findOneAndUpdate', 'save'], function (next) {
  switch (this.type_vendeur) {
    case 'Starter':
      this.nombre_article = 10;
      break;
    case 'Pro':
      this.nombre_article = 50;
      break;
    case 'Expert':
      this.nombre_article = Number.POSITIVE_INFINITY;
      break;
    default:
      this.nombre_article = undefined;
      break;
  }
  next();
});
userSchema.pre(['save'], function (next) {
  switch (this.role) {
    case 'Vendeur':
    case 'Admin':
      this.actived = false;
      break;
    default:
      break;
  }
  next();
});
userSchema.path('type_vendeur').required(function () {
  return this.role === 'Vendeur';
}, 'vous devez choisir le type de vendeur');

userSchema.path('id_fiscale').required(function () {
  return this.role === 'Vendeur';
}, 'un vendeur doit envoyer un identifiant fiscale');

userSchema.path('nombre_article').required(function () {
  return this.role === 'Vendeur';
}, "vous devais présiser un nombre d'article pour le vendeur");

module.exports = model('user', userSchema);
