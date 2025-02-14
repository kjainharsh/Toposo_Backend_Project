const express = require("express");
const { register, login, searchUserByUsername } = require("../controllers/auth-controllers");
const validate = require("../middlewares/validate-middleware");
const { registerSchema, loginSchema } = require("../validators/auth-validators");
const router = express.Router(); 

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.get("/search/:username", searchUserByUsername);

module.exports = router;