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
        'ant-design-vue': 'AntDesignVue'
      }
    },
    {
      file: 'dist/index-es.js',
      format: 'es',
      sourcemap: true,
      globals: {
        'ant-design-vue': 'AntDesignVue'
      }
    },
    {
      file: 'dist/index-cjs.js',
      format: 'cjs',
      sourcemap: true,
      globals: {
        'ant-design-vue': 'AntDesignVue'
      }
    }
  ],
  external: ['ant-design-vue'],
  plugins: [
    vue({
      compileTemplate: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules'],
      sourceMap: true
    }),
    babel({
      exclude: 'node_modules/**' // 排除 node_modules
    }),
    postcss({
      extract: 'css/index.css'
    }),
    terser()
  ]
}

export default config