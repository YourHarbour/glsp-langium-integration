const path = require('path');

module.exports = {
  mode: 'development', // 或 'production'
  entry: './src/langium/worker/healthcaredsml-server.ts', // 请根据实际文件路径调整
  output: {
    filename: 'healthcaredsml-server.bundle.js',
    path: path.resolve(__dirname, 'lib')
  },
  target: 'webworker',
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts']
    },
    // 优先加载 browser 字段，这有助于加载适用于浏览器环境的模块
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

};
