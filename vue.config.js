const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../dist'),
  devServer: {
    proxy: {
      '/auth/': {
        target: 'http://localhost:3000',
      },
    },
  },
};
