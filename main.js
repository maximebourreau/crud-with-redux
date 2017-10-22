const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const backend = require('./backend/backend');

const compiler = webpack({
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ["env", "stage-2", "react"]
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
});

const server = new WebpackDevServer(compiler, {

  contentBase: path.join(__dirname, 'public'),
  stats: { colors: true },
  historyApiFallback: true,
  before: backend

});

server.listen(3000, function() {});
