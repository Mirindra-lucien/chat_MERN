const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodeMailer = require('nodemailer');
const config = require('../../config/config');
const CWD = process.cwd();

async function sendEmail($to) {
    const code = crypto.randomInt(100000, 999999);
    const transport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email,
            pass: config.pass
        }
    });
    const option = {
        from: "MIMOZA",
        to: $to,
        subject: "Email verification",
        html: `
            <div>
                <h1 style="color: blue;">Email verification</h1>
                <p>Votre code de vérification est : <span style="color: red;">${code}</span>
            </div>
        `
    }
    await transport.sendMail(option).catch((err) => {
        return "verify email";
    });
    return code;
}


exports.create = async function (req, res) {
    const user = new User(req.body);
    user.updatedAT = Date.now();
    const code = await sendEmail(user.email).catch((reason) => {
        return res.send({message: "verify email"});
    });
    await User.create(user).catch((err) => {
        res.send({message: "error"});
    });
    res.send({message: "created", status: 201 , code: code});
}

exports.confirm = async function (req, res) {
    if(req.query && req.query.code == "ok") {
        await User.updateOne(req.user, {isConfirmed: true});
        res.send({message: "confirmed"});
    } else {
        const code = await sendEmail(req.user.email);
        res.send({code: code});
    }
}

exports.getUser = async function (req, res, next, id) {
    const user = await User.findOne({identity: id})
    .select("identity firstName lastName email city birthday profile createdAt updatedAt");
    if(!user) {
        return next({message: "no user found"});
    }
    req.user = user;
    next();
}

exports.view = function (req, res) {
    res.send(req.user);
}

exports.del = async function (req, res) {
    if(req.user.profile) {
        fs.unlink(req.user.profile, function (err) {
            if(err){
                return res.send({message: "error"});
            }
            else {
                fs.rmdir(path.dirname(req.user.profile), (err) => {
                    if(err) {
                        console.log(err);
                        return res.send({message: "problem deleting account"});
                    }
                });
            }
        });
    }
    await User.deleteOne(req.user);
    res.send({message: "deleted"});
}

exports.update = async function (req, res) {
    const user = req.user;
    let newuser = req.body;
    const profile = req.files.profile;
    const uploadPath = path.join(CWD, "/public/img", "/" + user.identity);
    const filename = Date.now() + crypto.randomInt(30) + "" +path.extname(profile.name);
    const file = uploadPath + path.sep + filename;
    newuser = {...newuser, ...user};
    fs.mkdir(uploadPath, {recursive: false}, (err) => {
        if((err && err.code == "EEXIST") || !err) {
            profile.mv(file, async (err) => {
                if(err) {
                    res.send({message: "error upload", status: 400});
                }
                else {
                    if(user.profile) {
                        fs.unlink(user.profile, async (err) => {
                            if(err) {
                                return res.send({message: "error changin profile", status: 400});
                            }
                        });
                    }
                    await User.updateOne(user, {
                        profile: file,
                        firstName: newuser.firstName,
                        lastName: newuser.lastName,
                        city: newuser.city,
                        birthday: newuser.birthday,
                        updatedAt: Date.now(),
                        email: newuser.email
                    });
                    res.send({status: 200, message: "updated"});
                }
            })
        }
    });
}

exports.find = async (req, res) => {
await User.find({firstName: new RegExp(req.body.name)});
}