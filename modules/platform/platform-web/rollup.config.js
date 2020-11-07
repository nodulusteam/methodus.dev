import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
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


export default {
    cache: false,
    preserveSymlinks: true,
    input: 'src/lib/index.ts',
    output:
        [{
            file: `dist/methodus-client.js`,
            format: 'commonjs',
            strict: false
        }
        ],
    plugins: [
        commonjs({ include: /node_modules/ }),
        resolve({
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
    external: [
        ...Object.keys(pkg.dependecies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ]
};
