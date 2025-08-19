/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: '../../.eslintrc.js',  // 继承外层配置
    parserOptions: {
      // 指向子模块的tsconfig
      project: './tsconfig.json',  
      tsconfigRootDir: __dirname,   // 关键！避免路径错误
    },
    settings: {
      'import/resolver': {
        typescript: {
          // 明确使用子模块的tsconfig解析路径
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.ts'],  // 支持的扩展名
        }
      }
    },
    rules: {
      // 可覆盖外层规则
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'ignorePackages', {
        js: 'never',  // 允许省略.js扩展名（需与TS配置一致）
        ts: 'never',
      }]
    }
  };