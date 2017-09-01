const webpack = require('webpack');
const bundleOutputDir = './wwwroot/dist';
const path = require('path');


//共用設定loader檔
const loaders = require('./webpack.loaders.js');

module.exports = (env) => {
    return [{
        entry: {
            "commons": [
                'react',
                'react-dom',
                'react-router-dom',
                'babel-polyfill',
                'react-hot-loader/patch',
                "react-hot-loader",
                "axios",
                "react-easyform",
                "history",
                "reactstrap", //0.74MB
                "bootstrap",
                "event-source-polyfill",
                // "react-scripts",
                // "aspnet-webpack",
                // "aspnet-webpack-react",
                "./node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css",

                //datepicker package
                'react-datepicker',
                "moment",
                "./node_modules/react-datepicker/dist/react-datepicker.css",
            ],
        },
        resolve: {
            extensions: ['.js']
        },
        module: loaders,
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            library: "[name]_[hash]",
            publicPath: '/dist/',
        },
        context: __dirname,
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.DllPlugin({
                path: path.join(__dirname, bundleOutputDir) + '/[name]-manifest.json',
                name: "[name]_[hash]",
                context: __dirname,
            }),
        ].concat((env) === "product" ? [
            //產品
            new webpack.optimize.UglifyJsPlugin({
                unused: true,
                sourceMap: true,
                warnings: false,
            }),
        ] : [])
    }];
};