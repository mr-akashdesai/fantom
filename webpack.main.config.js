module.exports = {
  // for files that should be compiled for electron renderer process
  target: 'electron-renderer',
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  
  entry: './src/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}
