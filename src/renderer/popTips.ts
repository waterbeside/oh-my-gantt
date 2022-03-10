import { createElement } from '../utils/helper'
import { OhMyGantt } from '../../typings/types'
export function renderPopTips(props: any, ctx: OhMyGantt) {
  const $arrow = createElement('div', {class: 'omg-pop-tips__arrow'})
  const $content = createElement('div', {class: 'omg-pop-tips__content'}, props.children)
  const $popTips = createElement('div', {class: 'omg-pop-tips'}, $arrow, $content)
  if (props.classList && props.classList.length > 0) {
    $popTips.classList.add(...props.classList)
  }
  return $popTips
}