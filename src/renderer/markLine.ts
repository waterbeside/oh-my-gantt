import { createElement } from '../utils/helper'
import { OhMarkLineOptions, MarkLine } from '../../typings/types'

export function renderMarkLine(props: OhMarkLineOptions, ctx: MarkLine) {
  const markLineClassName = 'omg-markline'
  const derectionClassName = `${markLineClassName}--${props.derection}`
  const $label = createElement('div', {class: `${markLineClassName}__label`}, props.label)
  const $elm = createElement('div', {class: `${markLineClassName} ${derectionClassName}`}, $label)
  if (ctx.color){
    $elm.style.setProperty('--color', ctx.color)
  }
  if (props.lineStyle) {
    $elm.style.setProperty('--line-style', props.lineStyle)
  }
  if (props.lineWidth) {
    $elm.style.setProperty('--line-width', props.lineWidth + 'px')
  }
  $elm.dataset.id = ctx.id
  return $elm
}