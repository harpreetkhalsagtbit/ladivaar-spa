const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    entry: {
        index: './src/js/index.js',
        output: './src/js/output.js'
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.ttf$/,
            use: [
              'url-loader'
            ]
          }
        ]
    }
  }