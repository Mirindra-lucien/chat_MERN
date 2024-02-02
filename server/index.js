const path = require('path');
const express = require('express');
const server = require('http').createServer();
const app = require('express')(server);
const mongoose = require('mongoose');
const compiler = require('./clientCompiler');
const config = require('./expressConfig');
const handleChat = require('./controllers/chatController');

const CWD = process.cwd();
const configuration = require('../config/config');
var uri = "mongodb://" + configuration.dbHost + ":" + configuration.dbPort + "/" +
    configuration.dbName;

mongoose.Promise = global.Promise;
mongoose.connect(uri).catch((reason) => {
    console.log(reason);
});

// handleChat(server);
config(app);
compiler(app);
app.use("/web", (req, res) => {
    res.sendFile(path.join(CWD, "/template/index.html"));
});
app.use("/img/", express.static(path.join(CWD, "/public/img")));
app.use("/css/", express.static(path.join(CWD, "/public/css")));
app.use("/files/", express.static(path.join(CWD, "/public/files")));
const srv = app.listen(8080, () => {
    console.log("server run on port : 8080");
});
handleChat(srv);