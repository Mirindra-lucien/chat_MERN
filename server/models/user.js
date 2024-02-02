const mongoose = require('mongoose');
const crypto = require('crypto');

const schema = new mongoose.Schema({
    identity: {
        type: String,
        default: crypto.randomUUID() + ""
    },
    firstName: {
        type: String,
        required: [true, "Name cannot empty"]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email cann't be empty"],
        unique: [true, "email not available"]
    },
    password: {
        type: String,
    },
    salt: {
        type: String
    },
    city: {
        type: String
    },
    profile: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    birthday: {
        type: Date
    }
}, {
    methods: {
        hashPass: function (pass) {
            this.mdp = pass;
            this.salt = this.makeSalt();
            this.password = crypto.createHmac("sha256", this.salt)
                .update(this.mdp)
                .digest("hex");
        },
        makeSalt: function () {
            return crypto.randomInt(100000, 999999) + "";
        },
        authenticate: function (pwd) {
            let pass = crypto.createHmac("sha256", this.salt).update(pwd).digest("hex");
            if(this.password == pass) {
                return true;
            } else {
                return false;
            }
        }
    },
    virtuals: {
        pwd: {
            get() {
                return this.mdp;
            },
            set(v) {
                this.hashPass(v);
            }
        },
        fullname: {
            get() {
                return this.firstName +" "+ this.lastName;
            },
            set(value) {
                const sep = value.indexOf(" ");
                this.firstName = value.substring(0, sep);
                this.lastName = value.substring(sep + 1);
            }
        }
    }
});

module.exports = mongoose.model("User", schema);