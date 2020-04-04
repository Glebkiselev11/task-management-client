const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  devServer: {
    proxy: {
      '/auth/': {
        target: 'http://localhost:3000',
      },
      '/tasks/': {
        target: 'http://localhost:3000',
      },
    },
  },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Task Management'
      return args
    })
  }
};
