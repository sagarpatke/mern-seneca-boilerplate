var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './common-ui/app',
  output: {
    path: path.join(__dirname, 'common-ui', 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: __dirname +'/node_modules'
      }
    ]
  },
  externals: {
    "React": "React"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}})
  ],
  resolve: {
    extensions: ['','.js','.jsx']
  }
}
