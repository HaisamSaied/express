var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var CleanPlugin = require('clean-webpack-plugin')

var distDir = path.resolve(__dirname, 'build')

var getFilesInDir = function (dir) {
  var ret = []
  var dirs = fs.readdirSync(dir);
  dirs.forEach(function (item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      ret.push(path.resolve(dir, item))
    }
  });
  return ret
}

// var getAngularEntry = function () {
//   var jsGroup = [];
//   var angularDir = path.resolve(__dirname, 'public/app');
//   var appPath = angularDir + '/app.js'
//   var dirs = ['/controllers', '/directives', '/services']
//
//   jsGroup.push(appPath)
//   dirs.forEach(function(dir) {
//     jsGroup = jsGroup.concat(getFilesInDir(angularDir + dir))
//   })
//   return jsGroup;
// }

var getBundleEntry = function () {
  return ["./public/javascripts/script.js"]
}

var webpackConfig = {
  devtool: "source-map",
  entry: {
    main: getBundleEntry(),
  },
  output: {
    library: 'haisam',
    path: distDir,
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  },
plugins: [
  new CleanPlugin(distDir),
]
};

module.exports = webpackConfig;
