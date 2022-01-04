const { getUsers } = require('../db.js');

exports.GetUsers = async (req, res) => {
    // let users = await getUsers();
    let users = {
        name: 'Udo',
        email: 'udo@macbulk.com',
        entries: 10
    }
    res.json(users);
}