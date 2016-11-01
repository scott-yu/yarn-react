var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    entry: {
        "./build/bundle": [
            "webpack-dev-server/client?http://localhost:9000",
            'webpack/hot/only-dev-server',
            "./src/index"
        ],
        "./build/oauth-main": "./src/oauth-main"
    },
    output: {
        path: './',
        filename: "[name].js",
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            loaders: ["react-hot-loader/webpack",'babel-loader?presets[]=react,presets[]=es2015'],
            exclude: /node_modules/
        },

        { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};