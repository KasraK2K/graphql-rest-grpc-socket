/* ------------------------------ Node Modules ------------------------------ */
const path = require('node:path')
/* ------------------------------ Dependencies ------------------------------ */
const nodeExternals = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const TerserPlugin = require('terser-webpack-plugin')
/* -------------------------------------------------------------------------- */

const { NODE_ENV = 'production' } = process.env

console.log({ NODE_ENV })

module.exports = {
    entry: './src/server.ts',
    mode: NODE_ENV,
    target: 'node',
    watch: false,
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'src/server.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{ test: /\.ts$/, use: ['ts-loader'] }]
    },
    plugins: [
        new WebpackShellPluginNext({
            onAfterDone: { scripts: ["echo 'Build complete!'"] }
        })
    ],
    optimization: { minimize: true, minimizer: [new TerserPlugin()] }
}
