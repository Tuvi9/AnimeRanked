const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: test } = require('node:test');

module.exports = {
    mode: "development",
    //! Entry point where webpack starts building a dependency graph
    entry: {
        main: ['./public/index.js', './src/index.js']  // Keep both entry points
    },

    //! Specifies where to bundle all the files.
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        //? Defining how different types of modules should be treated
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    //! Use babel for JS and JSX
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                //! For processing CSS
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    //! Plugins for extending Webpack capabilities.
    plugins: [
        new HtmlWebpackPlugin({
            //! Template file where to bundle JS
            template: './public/index.html',
            filename: 'index.html',
        }),
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
        }
    }
}