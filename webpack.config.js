var path = require('path');
module.exports = function (env) {
    var isProduction = env === 'production';
    return {
        entry: './src/index.ts',
        output: {
            path: path.join(__dirname, 'server'),
            filename: 'server.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [{
                loader: 'ts-loader',
                test: /\.ts$/,
                exclude: /node_modules/
            }]
        },
        externals: { 'express': 'commonjs express' }
        // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        // devServer: {
        //     contentBase: path.join(__dirname, 'public')
        // }
    };
};
//# sourceMappingURL=webpack.config.js.map