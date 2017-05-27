var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var relativeToRootPath = ".";
var WebpackShellPlugin = require('webpack-shell-plugin');
var f2eci = require("./f2eci");
var env = require("./f2eci").env;
var fs = require('fs');
var entryDir = path.resolve(__dirname, './src/entry/');
let entrys = {};

try {
    entrys = {};
    fs.readdirSync(entryDir).map(filename=> {
        if (path.extname(filename) !== '.js') return;
        let basename = path.basename(filename, path.extname(filename));
        entrys[basename] = [path.resolve(entryDir,`${filename}`)]
    });
    entrys=Object.assign(entrys,{
    });
} catch (e) {
    console.error("读取入口文件失败", e)
}
module.exports = {
  entry:entrys,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: env == 'alpha' ? './' : f2eci["urlPrefix"],
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
        'src': path.resolve(__dirname, './src'),
        'static': path.resolve(__dirname, './src/static'),
        'api': path.resolve(__dirname, './src/api'),
        'components': path.resolve(__dirname, './src/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
          test: /\.less$/,
          loader: env == "alpha" ? "style!css!postcss!less" : ExtractTextPlugin.extract('css!postcss!less')
      },
      {
          test: /\.css$/,
          loader: env == "alpha" ? "style!css!postcss!less" : ExtractTextPlugin.extract('css!postcss!less')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["url?limit=25000"]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart: ['gulp']}),
    new ExtractTextPlugin("[name].css", {
        disable: env == "alpha",
        allChunks: true
    }),
    new webpack.DefinePlugin({
        PAGE_NAME: JSON.stringify(require('./package.json').name)
    })
  ],
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    hot: true,
      disableHostCheck: true,
    contentBase: f2eci.output,
    publicPath: '/',
    stats:{
      colors: true
    }
  },
  devtool: '#source-map'
}
