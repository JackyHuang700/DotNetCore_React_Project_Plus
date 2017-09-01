
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';
const sourcePath = path.resolve(__dirname, '../wwwroot');

//共用設定loader檔
const loaders = require('./webpack.loaders.js');

//https://doc.webpack-china.org/guides/production/
module.exports = (env) => {
    return [{
        // devtool: 'source-map',
        // devtool: 'cheap-eval-source-map',
        // devtool: 'eval-source-map',
        devtool: 'cheap-module-eval-source-map',
        // devtool: 'cheap-eval-source-map',
        entry: {
            'Main': [
                `./ClientApp/Main.js`
            ],
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        context: __dirname,
        devServer: {
            contentBase: `${sourcePath}/dist/`,
            compress: true,
            inline: true,
            hot: true,
            proxy: {
                '*': {
                    target: 'http://localhost:60658',
                }
            },
            // watch: true,
            // devtool: "eval",
            port: 8080,
        },
        module: loaders,
        plugins: [

            // new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('production')
            // }),
            // new webpack.SourceMapDevToolPlugin({
            //     filename: '[file].map',
            //      exclude: ['vendor.js',],
            //       columns: false
            // }),


            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(`${path.join(__dirname, bundleOutputDir)}/commons-manifest.json`),
            }),
        ].concat((env) === "dev" ? [
            //開發
            new webpack.HotModuleReplacementPlugin(),
        ] : []).concat((env) === "product" ? [
            //產品
            //****************** */
            //UglifyJsPlugin setting_1
            new webpack.optimize.UglifyJsPlugin({
                unused: true,
                sourceMap: true,
                warnings: false,
            }),

            //UglifyJsPlugin setting_2
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false,
            //     },
            //     sourceMap: true,
            //     unused: true,
            // }),
            // new webpack.LoaderOptionsPlugin({
            //     minimize: true
            // }),
            //****************** */

            new webpack.optimize.CommonsChunkPlugin({
                name: "commons",
                // (the commons chunk name)

                filename: "commons.js",
                // (the filename of the commons chunk)

                // minChunks: 3,.
                // (Modules must be shared between 3 entries)

                // chunks: ["pageA", "pageB"],
                // (Only use these entries)
                minChunks: Infinity,
            }),
        ] : [])
    }];
};



// ///reference///

// module.exports = (env) => {
//     const isDevBuild = !(env && env.prod);
//     return [{
//         stats: { modules: false },
//         entry: { 'main': './ClientApp/boot.tsx' },
//         resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
//         output: {
//             path: path.join(__dirname, bundleOutputDir),
//             filename: '[name].js',
//             publicPath: '/dist/'
//         },
//         module: {
//             rules: [{
//                     test: /\.js$/,
//                     use: [{ loader: 'babel-loader' }],
//                     exclude: /node_modules/
//                 },
//                 { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
//                 { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
//                 { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
//             ]
//         },
//         plugins: [
//             new CheckerPlugin(),
//             new webpack.DllReferencePlugin({
//                 context: __dirname,
//                 manifest: require('./wwwroot/dist/vendor-manifest.json')
//             })
//         ].concat(isDevBuild ? [
//             // Plugins that apply in development builds only
//             new webpack.SourceMapDevToolPlugin({
//                 filename: '[file].map', // Remove this line if you prefer inline source maps
//                 moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
//             })
//         ] : [
//             // Plugins that apply in production builds only
//             new webpack.optimize.UglifyJsPlugin(),
//             new ExtractTextPlugin('site.css')
//         ])
//     }];
// };