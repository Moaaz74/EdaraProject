const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const authExport = require('../Controllers/auth');


// Login Request
router.post(
    "/login",
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("password should be between (8-16) character"),
    authExport.authinticateUser
);

module.exports = router;