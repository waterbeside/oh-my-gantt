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

export function toDate(date: Date | string) {
  return typeof date === 'string' ? new Date(date) : date
}


export function dateFormat(date: Date | string, format?: string) {
  date = date ? toDate(date) : new Date()
  const map: any = {
    'Y' : date.getFullYear(),
    'M' : date.getMonth()+1,//month
    'd' : date.getDate(),//date
    'H' : date.getHours(),//hours
    'm' : date.getMinutes(),//minutes
    's' : date.getSeconds() //seconds
  }
  for(const i in map){
    if(map[i]){
      if(map[i]<10){
        map[i] = '0'+map[i]
      }
    }
  }
  format = format || 'YYYY-MM-dd HH:mm:ss'
  const reg = new RegExp('Y+|M+|d+|H+|m+|s+','g')
  const regY = new RegExp('Y')
  format = format.replace(reg,function(v){
    let old = v
    if(regY.test(v)){
      const y = ''+map['Y']
      const len = 4-v.length
      old = y.slice(-len)
    }else{
      const key = v.slice(0,1)
      old = map[key]
    }
    return old
  })
  return format
}



/**
 * 取得日期列表
 * @param start 起始时间
 * @param end 结束时间
 * @param interval 时间间隔
 * @returns 
 */
export function getTimeList(
  start: Date | string,
  end: Date | string,
  interval: number
): Array<Date> {
  const list = []

  start = toDate(start)
  end = toDate(end)
  const startTime = start.getTime()
  const endTime = end.getTime()
  let time = startTime
  while (time <= endTime) {
    list.push(new Date(time))
    time += interval
  }
  return list
}

export function getTimeListInterval(flag: 'day' | 'hour' | 'week' | 'month'  | number= 'day') {
  if (typeof flag === 'number') {
    return flag
  }
  let interval = 1000 * 60 * 60 * 24
  if (flag === 'week') {
    interval = 1000 * 60 * 60 * 24 * 7
  } else if (flag === 'month') {
    interval = 1000 * 60 * 60 * 24 * 30
  } else if (flag === 'hour') {
    interval = 1000 * 60 * 60
  }
  return interval
}

/**
 * 同步容器滚动
 * @param source 源容器
 * @param target 目标
 */
export function syncScroll(source: HTMLElement, target: HTMLElement | HTMLElement[]) {
  source.onscroll = () => {
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
export function computeTimeBar(props: ComputeTimeBarWidthProps, ctx: OhMyGantt): ComputeTimeBarReturn {
  const { options, timeColumns } = ctx
  const { startTime, endTime } = props
  const startTimeStamp =  toDate(startTime).getTime()
  const endTimeStamp = toDate(endTime).getTime()

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
