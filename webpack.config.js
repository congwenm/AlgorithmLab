module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }]
  },
  resolve: {
    root: ['node_modules']
  },
  externals: {
    benchmark: true,
  },
  node: {
    fs: 'empty'
  }
};
