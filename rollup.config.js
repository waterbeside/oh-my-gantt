import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import ts from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'


const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

// pplugins
const tsPlugin = ts({extensions})

const terserPlugin = terser({ format: { comments: false } })

export default [
  // UMD for browser-friendly build
  {
    input: 'src/index.ts',
    output: {
      name: 'OMG',
			file: pkg.browser,
			format: 'umd'
    },
    plugins: [
      clear({ targets: ['dist'] }),
      resolve(),
      commonjs(),
      tsPlugin,
      terserPlugin
    ]
  },
  // ES module for bundlers build
  {
    input: 'src/index.ts',
    plugins: [
      tsPlugin,
      terserPlugin
    ],
    output: [
      {  file: pkg.module, format: 'es' }
    ]
  },
  {
    input: 'src/index.scss',
    plugins: [
      scss({
        processor: () => postcss([autoprefixer()]),
        output: 'dist/index.css'
      })
    ]
  }
]