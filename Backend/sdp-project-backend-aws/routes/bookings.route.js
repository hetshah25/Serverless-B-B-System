const Router = require("express");
const { bookingsController } = require("../controllers/index.js");

const bookingsRoute = Router();

bookingsRoute.get("/", bookingsController.getAllBookings);
//bookingsRoute.get("/:id", bookingsController.getBookingById);
bookingsRoute.get("/:email", bookingsController.getBookingByEmail);
bookingsRoute.put("/", bookingsController.addBooking);
bookingsRoute.put("/:id", bookingsController.modifyBooking);
bookingsRoute.delete("/:id", bookingsController.deleteBooking);

module.exports = bookingsRoute;
