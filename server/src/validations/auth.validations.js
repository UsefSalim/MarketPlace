const Joi = require('joi');

// register Validations

exports.registerValidations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(48).trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(6).max(1024),
    role: Joi.string().valid('SuperAdmin', 'Admin', 'Vendeur', 'Client'),
    type_vendeur: Joi.alternatives().conditional('role', {
      is: 'Vendeur',
      then: Joi.string().valid('Starter', 'Pro', 'Expert'),
    }),
    id_fiscale: Joi.alternatives().conditional('role', {
      is: 'Vendeur',
      then: Joi.string().required(),
    }),
  });

  return schema.validate(data);
};
// loginValidations

exports.loginValidations = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};
