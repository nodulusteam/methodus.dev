const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: { inline: false },
    entry: ['./src/lib/index.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'methodus-client.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};