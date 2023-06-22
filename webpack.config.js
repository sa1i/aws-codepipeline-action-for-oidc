const path = require('path');

module.exports = {
  entry: './src/index.ts', // Replace with your entry file path
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      //os: false, //
      os: require.resolve('os-browserify/browser'),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      http: require.resolve("stream-http") ,
      https: require.resolve("https-browserify"),
      fs: false,
    },
  },
  output: {
    filename: 'index.js', // Replace with your desired output filename
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
};
