const { auth } = require('xelor');

exports.authMiddleware =
  (Role1, Role2 = null, Role3 = null, Model) =>
  async (req, res, next) => {
    res.Role1 = Role1;
    res.Role2 = Role2;
    res.Role3 = Role3;
    res.Model = Model;
    await auth(req, res, next);
  };
