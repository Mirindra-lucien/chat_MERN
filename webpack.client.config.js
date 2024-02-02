var path = require('path');
var webpack = require('webpack');
const CWD = process.cwd();

const config = {
    entry: [
        "webpack-hot-middleware/client?reload=true&timeout=2000",
        path.join(CWD, "client/index.js")
    ],
    output: {
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = config;