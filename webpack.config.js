const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: test } = require('node:test');

module.exports = {
    mode: "development",
    //! Entry point where webpack starts building a dependency graph
    entry: './public/index.js',

    //! Specifies where to bundle all the files.
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        //? Defining how differet types of modules should be treated
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
        extensions: ['.js', 'jsx'],
    }
}