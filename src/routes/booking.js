const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { createTrip, allTrips, findTrip, bookTrip, verifyAndCreateBooking } = require('../controller/booking')
  
router.post("/createtrip", createTrip);
router.get("/alltrip", allTrips);
router.get("/findtrip", findTrip);
router.post("/book-trip", bookTrip);
router.post("/verify-booking", verifyAndCreateBooking);
router.get("/canceltrip", authMiddleware);

module.exports = router;
