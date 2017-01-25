var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['promise-polyfill','whatwg-fetch','./src/index.jsx'],
    output: { path: __dirname + "/dist", filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins:["transform-class-properties"]
                }
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        //'react': 'React',
        //"react-dom": "ReactDOM"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://local.com:8000',
                pathRewrite: {'^/api' : ''},
                secure: false
            }
        }
    }
};
