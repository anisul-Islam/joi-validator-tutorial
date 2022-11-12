const Joi = require("joi");

const registerUser = (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      age: req.body.age,
      languages: req.body.languages,
      isRegistered: req.body.isRegistered,
    };
    return res.status(201).json({
      message: "user was created",
      user,
    });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const loginUser = (req, res) => {
  try {
    return res.status(200).json({
      message: "user was logged in",
    });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
