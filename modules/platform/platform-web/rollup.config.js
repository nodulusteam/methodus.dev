import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';


const pkg = require(`${process.cwd()}/package.json`);
import path from 'path';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function selectOutputs() {
    const outputArr = [];
    if (pkg.main) {
        outputArr.push('main');
    }
    return outputArr;
}

export const outputs = selectOutputs();

const external = [
   
    'http', // imported by axios
    'https', // imported by axios
    'url', // imported by follow-redirects
    'assert', // imported by follow-redirects
    'stream', // imported by follow-redirects
    'tty', // imported by follow-redirects
    'util', // imported by follow-redirects
    'zlib', // imported by axios
  ];

export default {
    cache: false,
    preserveSymlinks: true,
    input: 'src/index.ts',
    output:
        [{
            file: `dist/methodus-client.js`,
            format: 'commonjs',
            strict: false
        }
        ],
    plugins: [
        json(),
        commonjs({ include: /node_modules/ }),
        resolve({
                extensions: ['.js', '.jsx'],
                browser: true,
            rootDir: path.join(process.cwd()),
            moduleDirectory: `${process.cwd()}/node_modules/**`,
            preferBuiltins: false,
            mainFields: ['broswer', 'main'],
            extensions
        }),
        typescript({
            tsconfig: 'tsconfig.json'
        })
    ],
    external
};
