import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import { dts } from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'

const config = [{
  input: './index.ts',
  output: [
    {
      file: 'dist/index-es.js',
      format: 'es',
      sourcemap: true,
      globals: {
        'vue': 'Vue',
        'element-plus': 'elementPlus',
        'echarts': 'echarts',
        'lodash': 'lodash'
      }
    }
  ],
  external: ['vue', 'element-plus', 'element-plus/dist/index.css', 'echarts', 'lodash'],
  plugins: [
    resolve(),
    babel({
      presets: ['@vue/babel-preset-jsx'],
      exclude: 'node_modules/**' // 排除 node_modules
    }),
    vue({
      compileTemplate: true,
      jsx: {
        factory: 'h'
      }
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules'],
      sourceMap: true
    }),
    postcss({
      extract: 'css/index.css',
      minimize: true
    }),
    terser()
  ]
},
{
  input: './type/index.d.ts',
  plugins: [dts()],
  output: {
    format: 'esm',
    file: 'dist/type/index.d.ts',
  }
}]

export default config