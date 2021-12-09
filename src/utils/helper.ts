import { toDate, getTimeIntervarFormatter, dateFormat, getTimeListInterval } from './dateHelper'

/**
 * 防抖
 */
export function debounce(
  fn: (...args: any) => any | void,
  wait = 500
): (...args: any) => any {
  let timer: any = null
  return function (this: any, ...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      return fn.apply(this, args)
    }, wait)
  }
}

/**
 * 同步容器滚动
 * @param source 源容器
 * @param target 目标
 */
export function syncScroll(source: HTMLElement, target: HTMLElement | HTMLElement[]) {
  source.onscroll = (e) => {
    if (Array.isArray(target)) {
      for (const item of target) {
        item.scrollTop = source.scrollTop
      }
    } else {
      target.scrollTop = source.scrollTop
    }
  }
}

export function syncScrollAll(elements: HTMLElement[]) {
  elements.forEach(item => {
    const target = elements.filter(item2 => item !== item2)
    syncScroll(item, target)
  })
}



/**
 * 计算表格要设置的体宽
 * @param props 
 * @returns 
 */
export function computeInnerWidth(props: { columns: ColumnItem[]}): number {
  const { columns } = props
  let sum = 0
  columns.forEach((column: ColumnItem) => {
    sum += Number(column.width) || 100
  })
  return sum
}


/**
 * 计算时间条长度和应在的时间起始列
 * @param {ComputeTimeBarWidthProps} props
 * @param {OhMyGantt} ctx 
 * @returns {number}
 */
export function computeTimeBar(props: ComputeTimeBarProps, ctx: OhMyGantt): ComputeTimeBarReturn {
  const { options, timeColumns } = ctx
  const { startTime, endTime } = props
  const timeInterval = options.timeInterval

  let timeIntervalFormatter = 'YYYY-MM-DD HH:mm:ss'
  if (typeof options.timeInterval === 'string') {
    timeIntervalFormatter = getTimeIntervarFormatter(timeInterval, true)
  }
  const startTimeStamp =  toDate(dateFormat(startTime, timeIntervalFormatter)).getTime()
  const endTimeStamp = toDate(dateFormat(endTime, timeIntervalFormatter)).getTime()
  

  // 计算占用了哪几个时间列
  const timeColumnsFilter: ColumnItem[] = []
  const timeColumnsFilterIndex: number[] = []
  for (const index in timeColumns) {
    const column = timeColumns[index]
    const date = column.sourceData as Date
    const dateStamp = date.getTime()
    if (dateStamp >= startTimeStamp && dateStamp <= endTimeStamp) {
      timeColumnsFilter.push(column)
      timeColumnsFilterIndex.push(Number(index))
    }
  }

  return {
    width: timeColumnsFilter.length * options.timeCellWidth,
    timeColumns: timeColumnsFilter,
    timeColumnsIndex: timeColumnsFilterIndex,
  }
}

/**
 * 计算时间列的Label
 */
export function computeTimeColumnLabel(date: Date, ctx: OhMyGantt): string {
  const { options } = ctx
  const timeInterval = options.timeInterval
  if (typeof timeInterval === 'string' && ['hour', 'day', 'month', 'year'].includes(timeInterval)) {
    return dateFormat(date, getTimeIntervarFormatter(timeInterval))
  } else if (timeInterval === 'week') {
    const end = date.getTime() + getTimeListInterval('week')
    return `${dateFormat(date, 'YYYY-MM-DD')}~${dateFormat(String(end), 'YYYY-MM-DD')}`
  }
  return dateFormat(date, 'YYYY-MM-DD HH:mm:ss')

}