import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

const config = {
  input: './index.ts',
  output: [
    {
      file: 'dist/index-umd.js',
      format: 'umd',
      name: 'z-vue-component',
      sourcemap: true,
      globals: {
        'vue': 'Vue',
        'element-plus': 'elementPlus'
      }
    },
    {
      file: 'dist/index-es.js',
      format: 'es',
      sourcemap: true,
      globals: {
        'vue': 'Vue',
        'element-plus': 'elementPlus'
      }
    },
    {
      file: 'dist/index-cjs.js',
      format: 'cjs',
      sourcemap: true,
      globals: {
        'vue': 'Vue',
        'element-plus': 'elementPlus'
      }
    }
  ],
  external: ['vue', 'element-plus', 'element-plus/dist/index.css'],
  plugins: [
    vue({
      compileTemplate: true
    }),
    postcss({
      extract: 'css/index.css',
      minimize: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules'],
      sourceMap: true
    }),
    babel({
      exclude: 'node_modules/**' // 排除 node_modules
    }),
    terser()
  ]
}

export default config