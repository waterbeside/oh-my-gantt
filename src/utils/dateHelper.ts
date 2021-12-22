
export function toDate(date: Date | string) {
  return typeof date === 'string' ? new Date(date) : date
}


export function dateFormat(date: Date | string, format?: string) {
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
export function getTimeList(
  start: Date | string,
  end: Date | string,
  timeInterval: 'year' | 'day' | 'hour' | 'week' | 'month'  | number = 'day'
): Array<Date> {
  const list = []
  let interval = getTimeListInterval('day')
  if (typeof timeInterval === 'string' && ['day', 'hour', 'week'].includes(timeInterval)) {
    interval = getTimeListInterval(timeInterval as 'day' | 'hour' | 'week')
  } else if (timeInterval === 'month') {
    return getTimeListBase(start, end, 'YYYY/MM', (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 1)
    })
  } else if (timeInterval === 'year') {
    return getTimeListBase(start, end, 'YYYY', (date) => {
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
export function getTimeListBase(
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


export function getTimeListInterval(flag: 'day' | 'hour' | 'week' | 'month'  | number = 'day') {
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