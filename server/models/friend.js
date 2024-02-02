const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    identity: {
        type: String,
        ref: "User"
    },
    friend: {
        type: String,
        ref: "User"
    },
    isFriend: {
        type: Boolean,
        default: false
    },
    isRequest: {
        type: Boolean
    },
    friendAt: {
        type: Date
    }
});

module.exports = mongoose.model("Friend", schema);