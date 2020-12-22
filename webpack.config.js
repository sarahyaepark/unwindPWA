const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SERVICE_ID': process.env.SERVICE_ID,
      'process.env.REACT_APP_TEMPLATE_ID': process.env.TEMPLATE_ID,
      'process.env.REACT_APP_EMAIL_USER_ID': process.env.EMAIL_USER_ID
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.png', '.css', '.ttf']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {test: /\.(png|jpg|jpeg|gif|svg|ttf)$/, loader: 'url-loader'}
    ]
  }
}
