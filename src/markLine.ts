

import { renderMarkLine } from './renderer/markLine'
import { createIdent } from './utils/helper'


export default class OhMarkLine {
  options: OhMarkLineOptionsExtendDefault
  id: string
  color?: string
  $element: HTMLElement
  constructor(options: OhMarkLineOptions) {
    const defaultOptions: any = {
      grid: 120,
      leftWidth: 240,
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