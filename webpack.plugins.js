/* eslint-disable @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = [new Dotenv(), new ForkTsCheckerWebpackPlugin(), new NodePolyfillPlugin()]
