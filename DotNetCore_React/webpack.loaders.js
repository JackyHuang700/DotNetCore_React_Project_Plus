//共用laoders設定
module.exports = {
    rules: [{
        test: /\.js[x]?$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/
    },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
    { test: /.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ]
};