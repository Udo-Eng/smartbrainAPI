const express = require('express');
// const BodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');

app.use(cors());
//Adding an express middleware to handle json 
app.use(express.json());

//Adding the cors middleware to handle cross origin resource sharing between front end and backend  


//Creating a database object to mimick a database
const database = {
    users: [
        {
            id: '12',
            name: 'abazie udo ',
            email: 'udo@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '0390',
            name: 'gold bee ',
            email: 'bee@gmail.com',
            password: 'food',
            entries: 0,
            joined: new Date(),
        },
    ],
    login: [
        {
            id: '',
            hash: '',
            email: 'udo@gmail.com'
        }
    ]
}




//Main  end point for this application 
app.get('/', (req, res) => {
    res.send(database.users)
})

// SignIn end point 
app.post('/signin', (req, res) => {
    // res.send('signin successfully thanks for using this application')

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {

        res.json('success')
    } else {
        console.log('error logging into the server ')
        res.status(400).json('error logging in')
    }
})

//Creating the register end point 
app.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    const generateId = () => {
        let range = 10000000;
        return Math.floor(Math.random() * range + 3768787);
    }
    //encrypting the password using bcrypt 
    bcrypt.hash(password, null, null, (err, res) => {
        ;
    })

    const newUser = {
        id: '1234',
        name: name,
        email: email,
        password: hash,
        entries: 0,
        joined: new Date(),
    }

    database.users.push(newUser);
    res.json(database.users[database.users.length - 1]);
})


//Creating and end point to get user profile 
app.get('/profile/:userId', (req, res) => {

    const { userId } = req.params;
    found = false;

    database.users.forEach(user => {
        if (user.id === userId) {
            found = true;
            res.json(user);
        }
    });
    if (!found) {
        res.status(404).json('user not found ')
    }
})

//Creating and end point to get user profile 
app.put('/image', (req, res) => {

    const { id } = req.body;
    found = false;

    database.users.forEach(user => {
        if (user.id === id) {

            found = true
            user.entries++;
            res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json('user not found ')
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// Before implementing any API you must plan the API 
/*
/ --> res == this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/