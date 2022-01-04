/*
Get Users
insert Users
Validate  Users
update Users information
*/
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
// const { credentials } = require('./config');

//Configuring the Database 
const postgres = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    // {
    //     // host: credentials.host,
    //     // port: credentials.port,
    //     // user: credentials.user,
    //     // password: credentials.password,
    //     // database: credentials.database
    // }
});


exports.getUsers = async () => {
    const users = await postgres.select('*').from('users');
    return users;
}

exports.insertUser = async (newUser, res) => {

    let { name, email, entries, joined, hash } = newUser;

    postgres.transaction(async trx => {
        try {
            const RegisterEmail = await trx
                .insert({
                    email,
                    hash
                }).into('login')
                .returning('email');

            let User = {
                name,
                email: RegisterEmail[0],
                entries,
                hash,
                joined
            }

            let results = await trx('users').returning('*').insert(User);

            await trx.commit;
            if (results.length) {
                // response with the user that registered
                res.json(results[0])
            }
        } catch (err) {
            if (err) {
                await trx.rollback;
                res.status(400).json('user not sucessfully registered');
            }
        }
    })

}

//query the database To validate Login  info
exports.ValidateUserLogin = async (email, password, res) => {
    try {
        const results = await postgres.select('hash').from('login').where('email', '=', email);

        if (!results.length) {
            return res.status(400).json('user login details is invalid')
        };

        let hash = results[0].hash;

        bcrypt.compare(password, hash, async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json('user login details is invalid');
            }
            if (result) {
                const user = await postgres.select('*').from('users').where('email', '=', email);
                return res.json(user[0]);
            } else {
                console.log('req was not sent sucessfully');
                return res.status(400).json('Unable to get user Please register again ');
            }
        })
    } catch (err) {
        res.status(400).json('Server Error Please try again later thanks');
    }


}

exports.getUserById = async (userId) => {
    const user = await postgres.select('*').from('users').where({ id: userId });

    return user;
}

exports.upDateUserEntries = async (userId) => {
    const entries = await postgres('users').where('id', '=', userId).increment('entries', 1).returning('entries');


    return entries;
}
