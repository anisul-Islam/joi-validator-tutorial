const Joi = require("joi");

exports.runValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: {
        wrap: {
          label: "",
        },
      },
    });

    if (error) {
      const errorList = error.details.map((err) => err.message);
      return res.status(201).json({
        message: "invalid input",
        errorList,
      });
    }
    next();
  };
};
