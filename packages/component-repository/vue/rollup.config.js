import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import nodeResolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'

const config = [{
  input: './index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'z-vue-component',
      sourcemap: true,
      globals: {
        'ant-design-vue': 'AntDesignVue'
      }
    }
  ],
  external: ['ant-design-vue'],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules'],
      sourceMap: true,
      declarationDir: './dist/types'
    }),
    babel({
      exclude: 'node_modules/**' // 排除 node_modules
    }),
    postcss({
      extract: 'css/index.css'
    }),
    vue({
      compileTemplate: true
    }),
    terser()
  ]
},
{
  input: './index.ts',
  output: [{ file: "dist/index.d.ts", format: "umd", name: 'z-vue-component', }],
  plugins: [dts()]
}]

export default config