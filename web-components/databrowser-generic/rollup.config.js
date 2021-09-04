/* eslint-disable import/no-extraneous-dependencies */
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const configTemplate = {
    output: {
        dir: 'dist-browser',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [resolve(), summary(), ...(process.env.NODE_ENV !== 'development' ? [terser()] : [])],
};

const config = [
    './dist/databrowser-generic.js',
].map(input => ({ ...configTemplate, input }));

export default config;
