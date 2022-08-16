const Router = require("express");
const { usersController } = require("../controllers/index.js");

const usersRoute = Router();

usersRoute.get("/:emailId", usersController.getUser);

module.exports = usersRoute;
