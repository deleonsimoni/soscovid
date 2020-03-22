const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Gallery = require('../models/gallery.model');
const config = require('../config/config');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
  insert,

}

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;

  //todo temover
  user.icAdmin = true;

  return await new User(user).save();
}
