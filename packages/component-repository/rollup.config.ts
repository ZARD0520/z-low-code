import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript'

const config = {
    input: {
        'react': './react/index.ts',
        'vue': './vue/index.ts'
    },
    output: {
        'react': {
            file: 'dist/react/bundle.js',
            format: 'umd'
        },
        'vue': {
            file: 'dist/vue/bundle.js',
            format: 'umd'
        }
    },
    plugins: [
        typescript(),
        babel({
            exclude: 'node_modules/**', // 排除 node_modules
            babelHelpers: 'bundled',
        }),
        terser()
    ]
}

export default config