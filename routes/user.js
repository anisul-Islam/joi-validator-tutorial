const express = require("express");

const { registerUser, loginUser } = require("../controllers/user");
const { runValidation } = require("../validation");
const { schemas } = require("../validation/schemas");

const userRouter = express.Router();

// api/register
userRouter.post(
  "/register",
  runValidation(schemas.registerSchema),
  registerUser
);

// api/login
userRouter.post("/login", runValidation(schemas.loginSchema), loginUser);

module.exports = userRouter;
