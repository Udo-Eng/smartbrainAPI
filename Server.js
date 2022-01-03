const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const { register } = require('./controllers/register');
const { signin } = require('./controllers/signin');
const { getUserProfile } = require('./controllers/GetProfile');
const { UpdateCount, imageAPI } = require('./controllers/image');
const { GetUsers } = require('./controllers/getUsers')




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
app.get('/', GetUsers)

// SignIn end point 
app.post('/signin', signin)

//Creating the register end point 
app.post('/register', register)


//Creating and end point to get user profile 
app.get('/profile/:userId', getUserProfile)

//Creating and end point to get user profile 
app.put('/image', UpdateCount);

app.post('/image', imageAPI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

