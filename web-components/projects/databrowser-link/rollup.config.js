/* eslint-disable import/no-extraneous-dependencies */
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: './dist/databrowser-link.js',
    output: {
        dir: 'dist-browser',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [resolve(), summary()],
}

if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(terser());
}

export default config;