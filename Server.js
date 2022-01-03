const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const { getUsers, insertUser, ValidateUserLogin, getUserById, upDateUserEntries } = require('./db.js');




//Adding the cors middleware to handle cross origin resource sharing between front end and backend 
app.use(cors());
//Adding an express middleware to handle json 
app.use(express.json());

// //Creating a database object to mimick a database
// const database = {
//     users: [
//         {
//             id: '12',
//             name: 'abazie udo ',
//             email: 'udo@gmail.com',
//             password: '123',
//             entries: 0,
//             joined: new Date(),
//         },
//         {
//             id: '0390',
//             name: 'gold bee ',
//             email: 'bee@gmail.com',
//             password: 'food',
//             entries: 0,
//             joined: new Date(),
//         },
//     ],
//     login: [
//         {
//             id: '',
//             hash: '',
//             email: 'udo@gmail.com'
//         }
//     ]
// }
// Before implementing any API you must plan the API 
/*
/ --> res == this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/


//Main  end point for this application 
app.get('/', async (req, res) => {
    let users = await getUsers();
    res.json(users);
})

// SignIn end point 
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('req was received sucessfully');
        await ValidateUserLogin(email, password, res);

    } catch (err) {
        res.status(400).json('Server Error please try again Later thanks ');
    }

    // if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    //     res.json('success')
    // } else {
    //     console.log('error logging into the server ');
    //     res.status(400).json('error logging in')
    // }
})

//Creating the register end point 
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

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
        res.status(400).json('error registering user')
    }
})


//Creating and end point to get user profile 
app.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        let user = await getUserById(userId);

        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('user not found');
        }

    } catch (err) {
        res.status(400).json('error finding user');
    }

})

//Creating and end point to get user profile 
app.put('/image', async (req, res) => {
    try {
        const { id } = req.body;

        const entries = await upDateUserEntries(id);

        if (entries.length) {
            res.json(entries[0]);
        } else {
            res.status(400).json('Unabale to get user entries');
        }
    } catch (err) {
        res.status(400).json('Server error unable to update user entries');
    }

    // Redundant code no longer in use 
    // found = false;

    // database.users.forEach(user => {
    //     if (user.id === id) {

    //         found = true
    //         user.entries++;
    //         res.json(user.entries);
    //     }
    // });
    // if (!found) {
    //     res.status(404).json('user not found ')
    // }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

