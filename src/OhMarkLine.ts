

import { renderMarkLine } from './renderer/markLine'
import { createIdent } from './utils/helper'

import {
  OhMarkLineOptionsExtendDefault,
  OhMarkLineOptions
} from '../typings/types'


export default class MarkLine {
  options: OhMarkLineOptionsExtendDefault
  id: string
  color?: string
  $element: HTMLElement
  constructor(options: OhMarkLineOptions) {
    const defaultOptions: any = {
      grid: 120
    }
    const opt: OhMarkLineOptionsExtendDefault = {
      ...defaultOptions,
      ...options
    }
    this.options = opt
    this.color = opt?.color
    this.id = createIdent(opt)
    this.$element = renderMarkLine(opt, this)
  }
}