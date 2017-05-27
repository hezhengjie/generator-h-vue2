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
  // resolveLoader: {
  //   root: path.join(__dirname, 'node_modules')
  // },
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
      rules: [
          {
              test: /\.vue$/,
              use: [{
                  loader: "vue-loader"
              }]
          },
          {
              test: /\.js$/,
              use: [{
                  loader: "babel-loader"
              }],
              exclude: [/node_modules/]
          },
          {
              test: /\.json$/,
              use: [
                  {
                      loader:"json-loader"
                  }]
          },
          {
              test: /\.html$/,
              use: [{
                  loader:"vue-html-loader"
              }]
          },
          {
              test: /\.css$/,
              use: env == "alpha" ?["style-loader","css-loader?minimize","postcss-loader","less-loader"]:ExtractTextPlugin.extract({
                  use: ["css-loader?minimize","postcss-loader","less-loader"]
              })
          },
          {
              test: /\.less$/,
              use: env == "alpha" ?["style-loader","css-loader?minimize","postcss-loader","less-loader"]:ExtractTextPlugin.extract({
                                      use: ["css-loader?minimize","postcss-loader","less-loader"]})
          },
          {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [{
                  loader: "url-loader",
                  options: {
                      limit: 25000,
                      name: 'images/[name].[hash:7].[ext]'    // 将图片都放入images文件夹下，[hash:7]防缓存
                  }
              }]
          },
          {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              use: [{
                  loader: "url-loader",
                  options: {
                      limit: 10000,
                      name: 'fonts/[name].[hash:7].[ext]'    // 将字体放入fonts文件夹下
                  }
              }]
          }
          ]
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart: ['gulp']}),
    new ExtractTextPlugin({
        filename:"[name].css",
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
