import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
// import typescript from 'rollup-plugin-typescript'
import ts from 'rollup-plugin-typescript2'
// import dts from 'rollup-plugin-dts'
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

console.log('getPath', getPath(pkg.types))

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
    // external: ['ms'],
    plugins: [
      tsPlugin
    ],
    output: [
      {  file: pkg.main, format: 'cjs' },
      {  file: pkg.module, format: 'es' }
    ]
  },
  {
    input: 'src/index.scss',
    plugins: [
      scss({
        processor: () => postcss([autoprefixer()]),

      })
    ]
  }
]