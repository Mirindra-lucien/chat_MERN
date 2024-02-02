const Friend = require('../models/friend');

exports.sendRequest = async function (req, res) {
    const identity = req.body.identity;
    const friend = req.body.friend;
    await Friend.create({identity: identity, friend: friend, isRequest: true})
        .catch((err) => {
            return res.send({message: "error"});
        });
    res.send({message: "added"});
}
    
exports.deleteReq = async function (req, res) {
    const identity = req.body.identity;
    const friend = req.body.friend;
    await Friend.deleteOne({identity: friend, friend: identity})
    .catch((err) => {
        return res.send({message: "error"});
    });
    res.send({message: "deleted"});
}

exports.confirmReq = async function (req, res) {
    const identity = req.body.identity;
    const friend = req.body.friend;
    const now = Date.now();
    await Friend.create({identity: identity, friend: friend, isFriend: true, friendAt: now})
        .catch((err) => {
            return res.send({message: "error"});
        });
    await Friend.findOneAndUpdate({identity: friend, friend: identity},
        {isFriend: true, friendAt: now})
        .catch((err) => {
            return res.send({message: "error"});
        });
    res.send({message: "accepted"});
}
        
        
exports.remove = async function (req, res) {
    const identity = req.body.identity;
    const friend = req.body.friend;
    await Friend.deleteOne({identity: identity, friend: friend}).catch((err) => {
        return res.send({message: "error"});
    });
    await Friend.deleteOne({identity: friend, friend: identity}).catch((err) => {
        return res.send({message: "error"});
    });
    res.send({message: "removed"});
}

exports.allFriends = async function (req, res) {
    const identity = req.params.idt;
    const friends = await Friend.find({identity: identity, isFriend: true})
    .catch((err) => {
        return res.send({message: "error"});
    });
    res.send(friends);
}

exports.allRequests = async function (req, res) {
    const identity = req.params.idt;
    const reqs = await Friend.find({isRequest: true, friend: identity})
    .catch((err) => {
        return res.send({message: "error"});
    });
    res.send(reqs);
}    