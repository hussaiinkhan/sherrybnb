const asyncHandler = require('express-async-handler');
const fs = require('fs');
const Place = require('../models/placeModel')

// @desc Add new Place
// @route POST /api/places
// @access private

const addPlace = asyncHandler(async (req, res) => {
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    const user_id = req.user.id
    
    
    // Validate required fields
    if (!title || !address || !description) {
        res.status(400);
        throw new Error('Title, address, and description are required.');
    }

    // Create a new place
    const place = new Place({
        user_id, // using authentication and req.user contains the authenticated user's data
        title,
        address,
        photos: addedPhotos, // Assuming addedPhotos is an array of filenames
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
    });

    // Save the place to the database
    const createdPlace = await place.save();

    // Return the created place
    res.status(201).json(createdPlace);
})


// @desc GET all Places
// @route GET /api/places
// @access public

// Fetch all places for homepage

const getAllPlaces = asyncHandler(async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    try {
        const places = await Place.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(places);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching places' });
    }
});


// @desc GET all Places
// @route GET /api/places
// @access private

// Fetch places added by the logged-in user

const getUserPlaces = asyncHandler(async (req, res) => {
    const userId = req.user.id;  // The user ID is retrieved from the validateToken middleware
    const places = await Place.find({ user_id: userId });  // Fetch places by user_id

    if (places) {
        res.status(200).json(places);
    } else {
        res.status(404).json({ message: "No places found for this user" });
    }
});


// Controller to fetch a single place by its ID
const getPlaceById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request params

        // Fetch the place from the database by its ID
        const place = await Place.findById(id);

        // If place not found, send a 404 response
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        // If found, send the place details as the response
        res.json(place);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}




// @desc Upload photos
// @route POST /api/places
// @access private

const uploadPhotos = asyncHandler(async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

module.exports = { addPlace, uploadPhotos,getAllPlaces,getUserPlaces,getPlaceById }; // Ensure it's correctly exported
