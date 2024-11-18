import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript'

const config = {
  input: './index.ts',
  output: [
    {
      dir: 'dist',
      entryFileNames: 'component.js',
      format: 'umd',
      name: 'Vue',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**', // 排除 node_modules
      babelHelpers: 'bundled',
    }),
    terser(),
    vue({
      css: true,
      compileTemplate: true
    })
  ]
}

export default config