const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/dbConnection');

connectDB();
const app = express();

const port = process.env.PORT || 5001; // Ensure a default port is set if environment variable is not provided

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply CORS middleware before serving static files
app.use(cors({
    origin: 'http://localhost:3000', // Adjust the origin if needed
    credentials: true
}));

// Serve static files with proper CORS headers
app.use('/uploads', express.static(__dirname + '/uploads', {
    setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or specify a domain
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Optional: specify resource policy
    }
}));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
