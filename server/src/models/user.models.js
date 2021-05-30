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
  livraison: {
    type: String,
    ennum: {
      values: ['Standard', 'Express '],
      message: '{VALUE} non supporté',
    },
  },
  total_vente: {
    type: Number,
  },
});
userSchema.pre(['save'], function (next) {
  switch (this.role) {
    case 'Vendeur':
      this.total_vente = 0;
      break;
    default:
      break;
  }
  next();
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
userSchema.pre(['save', 'findOneAndUpdate', 'updateOne'], function (next) {
  switch (this.type_vendeur) {
    case 'Expert':
      this.livraison = 'Expert';
      break;
    default:
      this.livraison = 'Standard';
      break;
  }
  next();
});

userSchema.path('id_fiscale').required(function () {
  return this.role === 'Vendeur';
}, 'un vendeur doit envoyer un identifiant fiscale');

module.exports = model('user', userSchema);
