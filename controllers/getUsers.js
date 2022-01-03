const { getUsers } = require('../db.js');

exports.GetUsers = async (req, res) => {
    let users = await getUsers();
    res.json(users);
}