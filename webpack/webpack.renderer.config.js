/* eslint @typescript-eslint/no-var-requires: "off" */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const rules = require('./webpack.common-rules')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
          isDevelopment && {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ].filter(Boolean)
      }
    ]
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ].filter(Boolean)
}
