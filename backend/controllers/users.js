const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const ConflictError = require('../errors/conflictError');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');

module.exports.getUsers = (_req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.send({
      name,
      about,
      avatar,
      email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Данный email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => res.send(newAvatar))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
