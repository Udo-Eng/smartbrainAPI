const { ValidateUserLogin } = require('../db');
const bcrypt = require('bcrypt-nodejs');


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json('Please enter the right details');
        } else {

            await ValidateUserLogin(email, password, res);
        }



    } catch (err) {
        res.status(400).json('Server Error please try again Later thanks ');
    }
}