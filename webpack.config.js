const path = require('path')

module.exports = {
  mode: 'development',
  entry: './app.js',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
