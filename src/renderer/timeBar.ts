/**
 * 画出时间线
 */
export function renderTimeBar(props: any, ctx: OhMyGantt): HTMLElement {
  const barElm = document.createElement('div')
  const options = ctx.options
  barElm.className = 'omg-grid__time-bar'
  barElm.style.width = `${props.width}px`
  if (options.timeBarGap[1] > 0) {
    barElm.style.marginLeft = `${options.timeBarGap[1]}px`
  }
  if (options.timeBarGap[0] > 0) {
    barElm.style.top = `${options.timeBarGap[0]}px`
  }
  if (options.timeBarHeight && options.timeBarHeight > 0) {
    barElm.style.height = `${options.timeBarHeight}px`
  } else  {
    barElm.style.bottom = `${options.timeBarGap[0]}px`
  }
  if (options.onMouseleaveTimeBar){
    barElm.addEventListener('mouseleave', (e: MouseEvent) => {ctx._handleActionTimeBar(e, 'mouseleave')})
  }
  return barElm
}
