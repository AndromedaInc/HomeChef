const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const SRC_DIR = path.join(__dirname, './src');
const DIST_DIR = path.join(__dirname, './dist');

module.exports = {
  entry: `${SRC_DIR}/App.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, // the $ matches the preceding item zero or one time, so this regex also searches for js files too
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: `${DIST_DIR}/index.html`
    })
  ]
};
