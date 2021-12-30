export const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/

/**
 * 转为日期对象
 * @param date 日期字符串或日期对象
 * @returns 返回日期对像
 */
export function toDate(date: Date | string): Date {
  if (date instanceof Date) {
    return date
  }
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE) as any
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3]
          || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }
  return  new Date(date)
}

export function dateFormat(date: Date | string, format?: string): string {
  date = date ? toDate(date) : new Date()
  const map: any = {
    'Y' : date.getFullYear(),
    'M' : date.getMonth()+1,//month
    'D' : date.getDate(),//date
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
  format = format || 'YYYY/MM/DD HH:mm:ss'
  const reg = new RegExp('Y+|M+|D+|H+|m+|s+','g')
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
 * @param timeInterval 时间间隔
 * @returns 
 */
export function createTimeList(
  start: Date | string,
  end: Date | string,
  timeInterval: TimeInterval = 'day'
): Array<Date> {
  const list = []
  let interval = computeTimeListInterval('day')
  if (typeof timeInterval === 'string' && ['day', 'hour', 'week'].includes(timeInterval)) {
    interval = computeTimeListInterval(timeInterval as 'day' | 'hour' | 'week')
  } else if (timeInterval === 'month') {
    return createTimeListBase(start, end, 'YYYY/MM', (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 1)
    })
  } else if (timeInterval === 'year') {
    return createTimeListBase(start, end, 'YYYY', (date) => {
      return new Date(date.getFullYear() + 1, 1, 1)
    })
  }
  if (interval !== 0) {
    start = toDate(start)
    end = toDate(end)
    const startTime = start.getTime()
    const endTime = end.getTime()
    let time = startTime
    while (time <= endTime) {
      list.push(new Date(time))
      time += interval
    }
  }
  return list
}

/**
 * 取得月列表
 * @param start 
 * @param end 
 * @returns 
 */
export function createTimeListBase(
  start: Date | string,
  end: Date | string,
  initFormatter: string,
  timeIntervalFn: (date: Date) => Date
): Array<Date>  {
  if (!timeIntervalFn) {
    return []
  }
  const list = []
  start = toDate(start)
  end = toDate(end)
  let time = toDate(dateFormat(start, initFormatter))
  while (time.getTime() <= end.getTime()) {
    list.push(time)
    time = timeIntervalFn(time)
  }
  return list
}

export function getTimeIntervarFormatter(timeInterval: TimeInterval, fill = false): string {
  if (timeInterval === 'year') {
    return fill ? 'YYYY/01/01 00:00:00' : 'YYYY'
  } else if (timeInterval === 'month') {
    return fill ? 'YYYY/MM/01 00:00:00' : 'YYYY/MM'
  } else if (timeInterval === 'hour') {
    return fill ? 'YYYY/MM/DD HH:00:00' : 'YYYY/MM/DD HH'
  }
  return fill ? 'YYYY/MM/DD 00:00:00' : 'YYYY/MM/DD'
}


/**
 * 计算时间列表间隔
 * @param flag 间隔时间或者时间标识
 * @returns 
 */
export function computeTimeListInterval(flag: 'day' | 'hour' | 'week' | 'month'  | number = 'day'): number {
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