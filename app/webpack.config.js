let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry:'./main.js',
  output: {path: __dirname, filename:'bundle.js'},
  module:{
    loaders:[{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets:['es2015','react','stage-1'],
        plugins: [
          'transform-decorators-legacy'
        ]
      }
    },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },


      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
}
