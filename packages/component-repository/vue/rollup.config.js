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
      dir: 'dist',
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
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules'],
      sourceMap: true
    }),
    vue({
      compileTemplate: true
    }),
    postcss({
      extract: 'css/index.css',
      minimize: true
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@vue/babel-preset-jsx'],
      extensions: ['.tsx', '.vue', '.ts'],
      exclude: 'node_modules/**' // 排除 node_modules
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