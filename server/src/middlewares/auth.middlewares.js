const jwt = require('jsonwebtoken');

exports.verifIsAuthenticated = (req, res) => {
  const token = req.cookies._token;
  if (!token) return res.json({ role: '', isAuthenticated: false });
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
    if (err) {
      return res
        .clearCookie('_token')
        .json({ role: '', isAuthenticated: false });
    }
    return res
      .status(200)
      .json({ role: decodedToken.data.role, isAuthenticated: true });
  });
};

const auth = async (req, res, next) => {
  const token = req.cookies._token;
  if (!token) return res.status(400).json({ role: '', isAuthenticated: false });
  jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
    if (err)
      return res
        .clearCookie('_token')
        .json({ role: '', isAuthenticated: false });
    res.currentUser = await res.Model.findOne({
      _id: decodedToken.data.id,
    }).select('-password');
    next();
  });
};

exports.accessedBy =
  (Model, Role1, Role2 = null, Role3 = null, Role4 = null) =>
  async (req, res, next) => {
    res.Role1 = Role1;
    res.Role2 = Role2;
    res.Role3 = Role3;
    res.Role4 = Role4;
    res.Model = Model;
    await auth(req, res, next);
  };
