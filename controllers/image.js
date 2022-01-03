
const { upDateUserEntries } = require('../db.js');
const { credentials } = require('../config');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: credentials.apiKey
});



exports.UpdateCount = async (req, res) => {
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
}

exports.imageAPI = (req, res) => {
    const { input } = req.body;

    app.models
        .predict(
            // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
            // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
            // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
            // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
            // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
            // so you would change from:
            // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            // to:
            // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
            // '53e1df302c079b3db8a0a36033ed2d15',
            Clarifai.FACE_DETECT_MODEL,
            input)
        .then(data => {
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.status(400).json('Error obtaining results for Clarifai')
        })
}

