/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: '@eclipse-glsp',
    root: true,
    // 新增：明确启用ESM语法支持
    parserOptions: {
        ecmaVersion: 'latest',    // 支持最新ECMAScript特性
        sourceType: 'module',     // 关键！声明使用ESM模块
        tsconfigRootDir: __dirname,
        project: 'tsconfig.eslint.json'
    },
    // 新增：配置模块解析规则
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.mjs', '.ts', '.tsx'], // 支持的扩展名
                // 如果使用TypeScript，需指定`tsconfig.json`路径
                project: 'tsconfig.json'
            }
        }
    },
    // 新增：启用必要的插件
    plugins: ['import'],
    rules: {
        // 强制检查未解析的导入路径
        'import/no-unresolved': 'error',
        // 其他规则...
    }
};