# Server side data validation

- why validation?
  - name is missing or not?
  - name length is valid or not?
  - email is valid or not?
- 2 popular framework - express-validator, joi

```js
// method 1
const Joi = require("joi");

const registerUser = async (req, res) => {
  try {
    // step1: create schema
    const userSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(8).required(),
    });

    // step2: validate the schema
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,

      // get rid of special characters from error response
      errors: {
        wrap: {
          label: "",
        },
      },
    });
    if (error) {
      const message = error.details.map((i) => i.message);
      return res.status(422).json({ error: message });
    }

    return res.status(201).send({ message: "user was created" });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

module.exports = { registerUser };
```

```js
// method 2 - create a middleware

// ROUTES
const { registerUser } = require("../controllers/user");
const { runValidation } = require("../validation");
const schemas = require("../validation/validators");

const userRouter = require("express").Router();
userRouter.post(
  "/register",
  runValidation(schemas.registerSchema),
  registerUser
);
module.exports = userRouter;

// validation folder
// validation/schema.js
const Joi = require("joi");

const schemas = {
  registerSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(8).required(),
    confirmPassword: Joi.ref("password"),
    isVerified: Joi.boolean().required(),
    age: Joi.number().required(),
    languages: Joi.array().items(Joi.string()),
    dob: Joi.date().greater(new Date("1980-01-01")).required(),
    address: {
      city: Joi.string().length(3).required(),
    },
  }),
};

module.exports = schemas;

// validation/index.js
const Joi = require("joi");

exports.runValidation = (schema) => {
  return (req, res, next) => {
    // step2: validate the schema
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,

      // get rid of special characters from error response
      errors: {
        wrap: {
          label: "",
        },
      },
    });
    if (error) {
      const message = error.details.map((i) => i.message);
      return res.status(422).json({ error: message });
    }
    next();
  };
};
```
