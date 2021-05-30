const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.ifExist = async (Model, finder, populate = null, select = null) =>
  await Model.findOne(finder).populate(populate).select(select);

// =================== Auth ======================//

exports.createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

exports.sendJwtToken = (res, statusCode, user) => {
  const token = this.createToken({ id: user._id, role: user.role });
  const cookieOpts = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRATION_TIME),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === 'production') cookieOpts.secure = true;
  return res
    .status(statusCode)
    .cookie('_token', token, cookieOpts)
    .json({ role: user.role, isAuthenticated: true });
};

exports.createUser = async (
  req,
  res,
  Model,
  validation,
  finder,
  Role = null
) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const ifUserExist = await this.ifExist(Model, finder);
  if (ifUserExist)
    return res.status(400).json(`${Object.keys(finder)[0]} existant `);
  const newUser = new Model({ ...req.body });
  newUser.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  if (Role) newUser.role = Role;
  const savedUser = await newUser.save();
  if (savedUser && newUser.role !== 'Client')
    return res.status(200).json({ actived: false });
  if (savedUser) this.sendJwtToken(res, 201, newUser);
};

exports.login = async (req, res, Model, validation, finder) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const UserExist = await this.ifExist(Model, finder);
  if (
    !UserExist ||
    !(await bcrypt.compare(req.body.password, UserExist.password))
  )
    return res.status(400).json('identifiant ou password Incorrect');
  if (UserExist.actived === false && UserExist.role === 'Admin') {
    return res.status(200).json({ activated: false, role: 'Admin' });
  }
  if (UserExist.actived === false && UserExist.role === 'Vendeur') {
    return res
      .status(200)
      .json("En Attente d'activation de votre compte par Un administrateur");
  }
  this.sendJwtToken(res, 200, UserExist);
};
