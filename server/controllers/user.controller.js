const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Gallery = require('../models/gallery.model');
const config = require('../config/config');


module.exports = {
  insert,
  callHelp,
}

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;

  //todo temover
  //user.icAdmin = true;

  return await new User(user).save();
}


async function callHelp(user, data) {
  console.log(data)
  return await User.findByIdAndUpdate(user._id, data, {
    new: true
  })

}
