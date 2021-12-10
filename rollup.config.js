import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import ts from 'rollup-plugin-typescript2'
import pkg from './package.json'

const getPath = _path => path.resolve(__dirname, _path)


const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

// ts
const tsPlugin = ts({
  extensions
})

export default [
  // UMD for browser-friendly build
  {
    input: 'src/index.ts',
    output: {
      name: 'howLongUntilLunch',
			file: pkg.browser,
			format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      tsPlugin
    ]
    
  },
  // CommonJS for Node and ES module for bundlers build
  {
    input: 'src/index.ts',
    plugins: [
      tsPlugin
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