/**
 * 画出时间线
 */
export function renderTimeBar(props: RenderTimeBarProps, ctx: OhMyGantt): HTMLElement {
  const barElm = document.createElement('div')
  const options = ctx.options
  barElm.className = 'omg-grid__time-bar'
  barElm.style.width = `${props.width}px`
  barElm.dataset.timeColumnsIndex = props.timeColumnsIndex.join(',')

  if (options.timeBarDraggable) {
    barElm.draggable = true
  }
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
  if (options.onDragTimeBar){
    barElm.addEventListener('mouseleave', (e: MouseEvent) => {ctx._handleActionTimeBar(e, 'mouseleave')})
  }

  
  if (options.timeBarRenderer) {
    // const timeBarData = ctx._getTimeBarData(barElm)
    const timeBarData: TimeBarData = {
      rowData: props.rowData,
      $target: barElm,
      rowIndex: Number(props?.rowIndex),
      value: null,
      timeColumnsIndex: props.timeColumnsIndex,
      columnIndex: props.timeColumnsIndex[0],
    }
    if (props.rowId) {
      timeBarData.rowId = String(props.rowId)
    }
    const renderer = options.timeBarRenderer(timeBarData, ctx)
    if (renderer !== null && typeof renderer === 'string') {
      barElm.innerHTML = renderer
    } else if (renderer !== null && typeof renderer === 'object') {
      barElm.appendChild(renderer)
    }
  }
  return barElm
}
