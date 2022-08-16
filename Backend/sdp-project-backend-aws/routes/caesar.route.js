const Router = require("express");
const { caesarController } = require("../controllers/index.js");

const caesarRoute = Router();

caesarRoute.post("/verify", caesarController.verifyCaesarCipher);

module.exports = caesarRoute;
