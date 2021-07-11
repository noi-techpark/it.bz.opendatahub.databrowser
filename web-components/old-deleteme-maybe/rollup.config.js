/* eslint-disable import/no-extraneous-dependencies */
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';

import multiInput from 'rollup-plugin-multi-input';

const inputs = [
    // 'index.ts',
    // 'modules/databrowser-counter/databrowser-counter.ts'
    // 'dist/modules/databrowser-counter/databrowser-counter.js'
    'out-tsc/**/databrowser-counter.js'
];

const plugins = [
    // resolve(), typescript(), summary()
    multiInput({ relative: 'out-tsc/' }), resolve(), summary()
];

if (process.env.NODE_ENV !== 'development') {
    plugins.push(terser());
}

/**
 * @type {import('rollup').RollupOptions}
 */
// const createConfig = (input) => ({
//     // input: 'modules/databrowser-counter/databrowser-counter.ts',
//     // input: './index.ts',
//     input,
//     // input: ['modules/**/*.ts'],
//     output: {
//         dir: 'dist',
//         format: 'es',
//         sourcemap: true,
//         preserveModules: true,
//         preserveModulesRoot: 'modules'
//     },
//     plugins,
// });

// const config = inputs.map(createConfig);
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    // input: 'modules/databrowser-counter/databrowser-counter.ts',
    // input: './index.ts',
    input: inputs,
    // input: ['modules/**/*.ts'],
    output: {
        dir: 'dist',
        // file: __dirname + '/databrowser2-counter.js',
        format: 'es',
        sourcemap: true,
        // preserveModules: true,
        // hoistTransitiveImports: true
        // preserveModulesRoot: 'dist'
    },
    plugins,
}

export default config;