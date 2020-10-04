const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.join(__dirname, 'src', 'app.tsx'),
    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    }
};
