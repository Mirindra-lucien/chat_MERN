const hotMiddleware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('../webpack.client.config');

const compiler = function (app) {
    let compile = webpack(config);
    app.use(devMiddleware(compile, {
        publicPath: config.output.publicPath
    }));
    app.use(hotMiddleware(compile));
}

module.exports = compiler;