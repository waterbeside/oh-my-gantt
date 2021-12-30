import { toDate, getTimeIntervarFormatter, dateFormat, computeTimeListInterval } from './dateHelper'
import MarkLine from '../OhMarkLine'

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

export function syncScrollFn(source: HTMLElement, target: HTMLElement | HTMLElement[], e: Event) {
  if (Array.isArray(target)) {
    for (const item of target) {
      item.scrollTop = source.scrollTop
    }
  } else {
    target.scrollTop = source.scrollTop
  }
}

/**
 * 同步容器滚动
 * @param source 源容器
 * @param target 目标
 */
export function syncScroll(left: HTMLElement, right: HTMLElement) {
  const scrollFns = {
    left: (e: Event) => {
      syncScrollFn(left, right, e)
    },
    right: (e: Event) => {
      syncScrollFn(right, left, e)
    }
  }
  
  const syncScrollBase = (sourceName: 'left' | 'right' ) => {
    const source = sourceName === 'left' ? left : right
    const target = sourceName === 'right' ? left : right
    const scrollFnForLeft = sourceName === 'left' ? scrollFns.left : scrollFns.right
    const scrollFnForRight = sourceName === 'right' ? scrollFns.left : scrollFns.right
    source.addEventListener('scroll', scrollFnForLeft)
    const emitScroll = (e: Event) => {
      source.removeEventListener('scroll', scrollFnForLeft)
      target.removeEventListener('scroll', scrollFnForRight)
      source.addEventListener('scroll', scrollFnForLeft)
    }
    source.addEventListener('mouseenter', emitScroll)
    source.addEventListener('touchstart', emitScroll)
  }  
  syncScrollBase('left')
  syncScrollBase('right')
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
 * @param {ComputeTimebarWidthProps} props
 * @param {OhMyGantt} ctx 
 * @returns {number}
 */
export function computeTimebar(props: ComputeTimebarProps, ctx: OhMyGantt): ComputeTimebarReturn {
  const { options, timeColumns } = ctx
  const { from, to } = props
  const timeInterval = options.timeInterval

  let timeIntervalFormatter = 'YYYY-MM-DD HH:mm:ss'
  if (typeof options.timeInterval === 'string') {
    timeIntervalFormatter = getTimeIntervarFormatter(timeInterval, true)
  }
  const startTimeStamp =  toDate(dateFormat(from, timeIntervalFormatter)).getTime()
  const endTimeStamp = toDate(dateFormat(to, timeIntervalFormatter)).getTime()
  

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
    const end = date.getTime() + computeTimeListInterval('week')
    return `${dateFormat(date, 'YYYY-MM-DD')}~${dateFormat(String(end), 'YYYY-MM-DD')}`
  }
  return dateFormat(date, 'YYYY-MM-DD HH:mm:ss')

}


/**
 * 输入一个时间，计算该时间在时间表格中的位置
 * @param time 时间
 * @param ctx OhMyGantt实例
 * @param returnPercent 是否返回百分比
 * @returns  number | false
 */
export function computeTimeLeft(time: Date | string, ctx: OhMyGantt, returnPercent = false): number | false {
  const { options, $elements, timeList } = ctx
  const $timeGrid = $elements.timeGrid
  if (!$timeGrid ) {
    return false
  }
  const timeGridInnerWidth = $timeGrid.querySelector('.omg-grid__inner')?.getBoundingClientRect().width
  const timeCellWidth = options.timeCellWidth
  const startTimeStamp = timeList[0].getTime()
  const endTimeStamp = timeList[timeList.length - 1].getTime()
  const timeStamp = toDate(time).getTime()
  let timeLeft = 0
  if (timeStamp < startTimeStamp || timeStamp > endTimeStamp) {
    return false
  }
  const timeLeftPrecent = (timeStamp - startTimeStamp) / (endTimeStamp - startTimeStamp)
  
  if (!timeGridInnerWidth) {
    return false
  }
  timeLeft = timeLeftPrecent * (timeGridInnerWidth - timeCellWidth)
  if (returnPercent){
    return timeLeft / timeGridInnerWidth
  }
  return timeLeft
}


/**
 * 计算markline离左边的距离
 * @param markLine markLine对象
 * @param ctx OhMyGantt对象
 * @returns  number | false
 */
export function computeMarkLineLeft(markLine: MarkLine, ctx: OhMyGantt): number | false {
  const mkOptions = markLine.options
  if (mkOptions.derection === 'vertical') { // 本方法只计算垂直方向的markline
    if (mkOptions.grid === 'time') { // 如果是时间表格
      const markLineTime = mkOptions.time ? mkOptions.time : null
      if (!markLineTime) {
        return false
      }
      const timeLeft = computeTimeLeft(markLineTime, ctx, true)
      return timeLeft
    }
  }
  
  return false
}


/**
 * 随机生成id
 * @param row any data
 * @returns 
 */
export function createIdent(row: any = null) {
  row = row || {}
  const jsonstr = JSON.stringify(row)
  const hc = ('0000000000' + Math.abs(hashCode(jsonstr))).slice(-9)
  const now = (Date.now() + Number(Math.random().toString().slice(-6))).toString().slice(-9)
  return `${hc}-${now}`
}


export function hashCode(str: string): number {
  let hash = 0, i, chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}


/**
 * 创建元素
 * @param tag 标签名
 * @param props 属性
 * @param children 子完素
 * @returns HTMLElement
 */
export function createElement(tag: string, props: any, ...children: any[]): HTMLElement {
  const element = document.createElement(tag)
  Object.keys(props).forEach(key => {
    element.setAttribute(key, props[key])
  })

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      element.appendChild(child)
    })
  }
  return element
}
