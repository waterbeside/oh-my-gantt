/**
 * 画出时间线
 */
export function renderTimeBar(props: any, ctx: OhMyGantt): HTMLElement {
  const barElm = document.createElement('div')
  barElm.className = 'omg-grid__time-bar'
  barElm.style.width = `${props.width}px`
  return barElm
}
