const Message = require('../models/message');

exports.message = async (req, res) => {
    try {
        const msg = await Message.find({
            identity: req.body.identity,
            friend: req.body.friend
        }).sort({sendAt: -1});
        res.send(msg);
    } catch(err) {
        res.send({message: "error"});
    }
}

exports.allMessage = async function (req, res) {
    const id = req.params.identit;
    try {
        let msgs = [];
        msgs = await Message.findAllRecById(id);
        res.send(msgs);
    } catch(err) {
        res.send({message: "error"});
    }
}