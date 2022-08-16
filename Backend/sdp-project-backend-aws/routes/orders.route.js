const Router = require("express");
const { ordersController } = require("../controllers/index.js");

const ordersRoute = Router();

ordersRoute.get("/", ordersController.getAllOrders);
//ordersRoute.get("/:id", ordersController.getOrderById);
ordersRoute.get("/:email", ordersController.getOrderByEmail);
ordersRoute.put("/", ordersController.addOrder);
ordersRoute.put("/:id", ordersController.modifyOrder);
ordersRoute.delete("/:id", ordersController.deleteOrder);

module.exports = ordersRoute;
