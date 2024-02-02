const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const config = require('../config/config');
const userRouter = require('./routes/userRoute');
const friendRouter = require('./routes/friendRoute');
const authRouter = require('./routes/authRoute');
const msgRouter = require('./routes/msgRoute');

const configure = function (app) {
    app.use(cors({origin: true}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieSession({keys: config.sessionKey}));
    app.use(userRouter);
    app.use(friendRouter);
    app.use(authRouter);
    app.use(msgRouter);
}

module.exports = configure;