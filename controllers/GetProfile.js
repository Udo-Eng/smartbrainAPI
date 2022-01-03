
const { getUserById } = require('../db.js');


exports.getUserProfile = async (req, res) => {
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

}