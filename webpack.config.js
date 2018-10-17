const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const webpack = require('webpack');

const path = require('path');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: {
    main: `${SRC_DIR}/index.jsx`,
  },
  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, // the $ matches the preceding item zero or one time, so this regex also searches for js files too
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      systemvars: true,
    }),
    // new webpack.DefinePlugin({ // <-- key to reducing React's size
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production'),
    //   },
    // }),
    // new webpack.optimize.DedupePlugin(), // dedupe similar code
    // new webpack.optimize.UglifyJsPlugin(), // minify everything
    // new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
  ],
};
