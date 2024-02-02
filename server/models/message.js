const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    identity: {
        type: String,
        ref: "User",
        required: [true, "Need identity here"]
    },
    friend: {
        type: String,
        ref: "User",
        required: [true, "Need identity here"]
    },
    sendAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["text", "image", "file"]
    },
    content: {
        type: String,
        required: [true, "You cann't send an empty message"]
    },
    sens: {
        type: String,
        enum: ["rec", "sen"]
    }
}, {
    methods: {
        findAllRecById: async function(id) {
            let msgs = [];
            const frs = await this.find({identity: id}).distinct("friend");
            for(let value of frs) {
                const msg = await this.find({identity: id, friend: value})
                    .sort({sendAt: -1})
                    .limit(1);
                    msgs.push(msg[0]);
            }
            msgs = msgs.sort(function(a, b) {
                let x = new Number(new Date(a.sendAt));
                let y = new Number(new Date(b.sendAt));
                return y - x;
            });
            return msgs;
        }
    }
});

module.exports = mongoose.model("Message", schema);