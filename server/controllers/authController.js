const User = require('../models/user');
const jwt = require('jsonwebtoken');
const key = require('../../config/config').cookieKey;

exports.signin = async (req, res) => {
    const user = await User.findOne({email: req.body.email}).catch(
        (err) => {
            res.send({message: "error"});
        }
    );
    if(!user) {
        return res.send({message: "Maybe you don't have account or verify your email"});
    }
    if(!user.authenticate(req.body.password)) {
        return res.send({message: "verify your password"});
    }
    const token = jwt.sign({identity: user.identity}, key);
    res.cookie('jwt', token, {maxAge: 1000*3600*24*30});
    res.send({
        message: "authenticated",
        token: token,
        name: user.firstName,
        lastName: user.lastName,
        city: user.city,
        birthday: user.birthday,
        profile: user.profile,
        identity: user.identity,
        id: user._id
    });
}

exports.signout = function (req, res) {
    res.clearCookie("jwt");
    res.send({
        message: "disconnected"
    });
}