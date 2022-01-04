
const { insertUser } = require('../db.js');
const bcrypt = require('bcrypt-nodejs');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json('Please enter the right details')

        }
        //encrypting the password using bcrypt 
        bcrypt.hash(password, null, null, async (err, hash) => {
            if (err) console.log(err);

            //Creating a new Userwith hashed password
            const newUser = {
                name: name,
                email: email,
                entries: 0,
                joined: new Date(),
                hash: hash,
            }
            await insertUser(newUser, res);
        })

    } catch (err) {
        console.log(err);
        res.status(400).json('error registering user')
    }
}