import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, hotelOwner } from "../middlewares";
// controllers
import {
  cancelBooking,
  create,
  hotels,
  image,
  sellerHotels,
  bookHotel,
  remove,
  read,
  update,
  userHotelBookings,
  isAlreadyBooked,
  searchListings,
  checkHotelAvailability,
  getHotelBookings,
  getCompletedOrdersCount
} from "../controllers/hotel";

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.delete("/delete-booking/:orderId", requireSignin, cancelBooking);
router.get("/hotel/:hotelId", read);
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  update
);
// orders
router.get("/user-hotel-bookings", requireSignin, userHotelBookings);
router.post("/book-hotel", requireSignin, bookHotel);
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);
router.post("/search-listings", searchListings);
router.post("/check-hotel-availability", checkHotelAvailability);
router.get("/hotel-bookings/:hotelId", getHotelBookings);
router.get("/completed-bookings/:userlId", getCompletedOrdersCount);




module.exports = router;
