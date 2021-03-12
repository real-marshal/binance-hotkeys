/* eslint @typescript-eslint/no-var-requires: "off" */
const rules = require('./webpack.common-rules')

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  module: {
    rules: [
      ...rules,
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  }
}
