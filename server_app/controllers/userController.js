const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc Register new User
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are mandatory' });
        return;
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(409).json({ message: 'User already registered' });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400).json({ message: 'User data is not valid' });
    }
});

// @desc Login User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are mandatory' });
        return;
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({    //have to save the token while loggin in with the same name 
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' });
        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ message: 'Email or Password is not valid' });
    }
})

//@desc  User Info
//@route GET /api/users
//@access private

const infoUser = asyncHandler(async (req, res) => {
    try {
        // Assuming req.user contains the user ID from the token
        const user = await User.findById(req.user.id).select('name email');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Send the user's name and email as a response
        res.json({ name: user.name, email: user.email });
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
});

module.exports = infoUser;


module.exports = { registerUser, loginUser, infoUser };