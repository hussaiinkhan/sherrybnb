const express = require('express');
const { createBooking, getBookingsByUserId } = require('../controllers/bookingController');
const router = express.Router();
const validateToken = require('../middlewares/validateTokenHandler');
// Route to create a new booking
router.post('/create',validateToken, createBooking);

// Route to fetch bookings by user_id
router.get('/getbookings',validateToken, getBookingsByUserId);

module.exports = router;
