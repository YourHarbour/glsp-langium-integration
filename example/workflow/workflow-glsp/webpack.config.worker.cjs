const path = require('path');

/**
 * Bundles the Langium language server of the workflow DSL into a single file
 * that can be loaded as a web worker (see `WorkflowLangiumWorkerFactory`).
 */
module.exports = {
    mode: 'development',
    entry: './src/langium/worker/workflow-language-server.ts',
    output: {
        filename: 'workflow-language-server.bundle.js',
        path: path.resolve(__dirname, 'lib')
    },
    target: 'webworker',
    resolve: {
        extensions: ['.ts', '.js'],
        extensionAlias: {
            '.js': ['.js', '.ts']
        },
        // prefer the browser field so that browser-compatible variants of the modules are used
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
    }
};
