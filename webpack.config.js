const path      = require('path');
const webpack   = require("webpack");

module.exports = {
    entry: {
        'circle' : path.join(__dirname, 'src', 'circle.ts'),
        'circles' : path.join(__dirname, 'src/circles', 'circles.ts'),
        'distance' : path.join(__dirname, 'src/distance', 'distance.ts'),
        'blur' : path.join(__dirname, 'src/blur', 'blur.ts'),
        'filter' : path.join(__dirname, 'src/filter', 'filter.ts'),
    },

    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js', '.scss', '.css'],
    },

    module: {
        loaders: [
            { test: /\.ts$/, exclude: /node_modules/, loader: 'awesome-typescript-loader'},
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query:{presets: ['es2015']} },
        ]
    },

    devtool: '#source-map'
};