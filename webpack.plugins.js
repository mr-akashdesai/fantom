/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = [ new Dotenv(), new ForkTsCheckerWebpackPlugin(), new NodePolyfillPlugin()]
