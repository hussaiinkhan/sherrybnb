const Booking = require('../models/bookingModel'); // Assuming bookingModel.js is your model file


// Controller to create a new booking
const createBooking = async (req, res) => {
    const {  place, checkIn, checkOut, name, phone } = req.body;
 
    const user_id = req.user.id

    if (!place || !checkIn || !checkOut || !name || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    console.log('hey');
    try {
        const newBooking = await Booking.create({
            user_id: user_id,
            place: place,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            name,
            phone
        });
        
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Error creating booking', details: error.message });
    }
};

// Controller to fetch bookings by user_id
const getBookingsByUserId = async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.find({ user_id: userId });

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this user' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bookings', details: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingsByUserId
};
