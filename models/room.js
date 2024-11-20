const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    participants: { type: Array, required: true },
    messages: [
        { type: mongoose.Types.ObjectId, ref: 'Message' }
    ]
});

module.exports = mongoose.model('Room', roomSchema);