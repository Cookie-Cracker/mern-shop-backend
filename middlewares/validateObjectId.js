const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID. Must be a string of 12 bytes or a string of 24 hex characters')

    next();
}