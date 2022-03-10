import {
  RenderTimebarProps,
  OhMyGantt,
  TimebarData
} from '../../typings/types'

/**
 * 画出时间线
 */
export function renderTimebar(props: RenderTimebarProps, ctx: OhMyGantt): HTMLElement {
  const barElm = document.createElement('div')
  const options = ctx.options
  barElm.className = 'omg-grid__timebar'
  barElm.style.width = `${props.width}px`
  barElm.dataset.timeColumnsIndex = props.timeColumnsIndex.join(',')
  barElm.dataset.timebarIndex = String(props.timebarIndex)
  barElm.dataset.rowId = String(props.rowData.id)

  if (options.timebarDraggable) {
    barElm.draggable = true
  }
  if (options.timebarGap[1] > 0) {
    barElm.style.marginLeft = `${options.timebarGap[1]}px`
  }
  if (options.timebarGap[0] > 0) {
    barElm.style.top = `${options.timebarGap[0]}px`
  }
  if (options.timebarHeight && options.timebarHeight > 0) {
    barElm.style.height = `${options.timebarHeight}px`
  } else  {
    barElm.style.bottom = `${options.timebarGap[0]}px`
  }
  // console.log('props.timebarItemData', props.timebarItemData)
  if (props.timebarItemData.__config) {
    const timebarConfig = props.timebarItemData.__config
    if (timebarConfig.style) {
      for (const key in timebarConfig.style) {
        barElm.style[key] = timebarConfig.style[key] as any
      }
    }
  }

  if (options.onMouseleaveTimebar){
    barElm.addEventListener('mouseleave', (e: MouseEvent) => {ctx._handleActionTimebar(e, 'mouseleave')})
  }

  
  if (options.timebarRenderer) {
    // const timebarData = ctx._getTimebarData(barElm)
    const timebarData: TimebarData = {
      rowData: props.rowData,
      $target: barElm,
      rowIndex: Number(props?.rowIndex),
      value: null,
      timeColumnsIndex: props.timeColumnsIndex,
      columnIndex: props.timeColumnsIndex[0],
      timebarItemData: props.timebarItemData,
    }
    const renderer = options.timebarRenderer(timebarData, ctx)
    if (renderer !== null && typeof renderer === 'string') {
      barElm.innerHTML = renderer
    } else if (renderer !== null && typeof renderer === 'object') {
      barElm.appendChild(renderer)
    }
  } else if (props.timebarItemData.desc !== undefined) {
    barElm.innerHTML = props.timebarItemData.desc
  }
  return barElm
}
