const express = require('express');
const multer = require('multer');

const validateToken = require('../middlewares/validateTokenHandler'); // Middleware to check if the user is authenticated
const { uploadPhotos,getAllPlaces,getUserPlaces,addPlace,getPlaceById } = require('../controllers/placeController'); 

const router = express.Router();

// Route to add place
router.post('/addplace', validateToken, addPlace);
// Route to fetch all places (for homepage)
router.get('/allplaces', getAllPlaces);

// Route to fetch places added by the logged-in user
router.get('/userplaces', validateToken, getUserPlaces);

// Route to fetch a single place by ID
router.get('/:id', getPlaceById);

const photosMiddleware = multer({ dest: 'uploads' });
router.post('/uploadphotos', photosMiddleware.array('photos', 10), uploadPhotos); // Ensure 'uploadPhotos' is correctly named and defined

module.exports = router;
