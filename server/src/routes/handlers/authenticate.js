require('dotenv').load();
import {User} from '../../models';
import jwt from 'jsonwebtoken';

export async function registerUser (req, res, next) {
  try {
    let user = await User.create(req.body);
    let {id, email, name, surname, isVet, profileImgUrl} = user;

    let token = jwt.sign({
      id,
      email,
      name,
      surname,
      isVet,
      profileImgUrl
    }, process.env.SECRET_KEY)
    return res.status(200).json({
      id,
      email,
      name,
      surname,
      profileImgUrl,
      isVet,
      token
    })
  } catch (err) {
    if (err.name && err.code === 11000) {
      return res.status(500).json({error: {message: 'Taki email jest już zajęty!'}})
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}

export async function loginUser (req, res, next) {
  try {
    let foundUser = await User.findOne({email: req.body.email});
    let {id, name, surname, email, isVet, profileImgUrl} = foundUser;
    let isMatch = await foundUser.comparePasswords(req.body.password);
    if (isMatch) {
      let token = jwt.sign({
        id,
        email,
        name,
        surname,
        isVet,
        profileImgUrl
      }, process.env.SECRET_KEY)
      return res.status(200).json({
        id,
        email,
        name,
        surname,
        isVet,
        profileImgUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: 'Niepoprawny email lub hasło!'
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Niepoprawny email lub hasło!'
    })
  }
}

export function makeSureUserIsLoggedIn (req, res, next) {
  try {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, verified) {
      if (verified) {
        return next()
      } else {
        return next({
          status: 401,
          message: 'Zaloguj się aby to zrobić!'
        })
      }
    })
  } catch (e) {
    return next({
      status: 401,
      message: 'Zaloguj się!'
    });
  }
}

export function makeSureCorrectUser (req, res, next) {
  try {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, verified) {
      if (verified && verified.id === req.params.user_id) {
        return next()
      } else {
        return next({
          status: 401,
          message: 'To nie Ty! Nie hakuj mi tutaj serweru!'
        })
      }
    })
  } catch (e) {
    return next({
      status: 401,
      message: 'Zaloguj się pliz!'
    })
  }
}

export async function editUser (req, res, next) {
  try {
    let foundUser = await User.findById(req.params.user_id);
    foundUser.name = req.body.name;
    foundUser.surname = req.body.surname;
    foundUser.profileImgUrl = req.body.profileImgUrl;
    foundUser.save();
    return res.status(200).json(foundUser);
  } catch (e) {
    return next(e);
  }
}
