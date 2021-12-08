
import { getTimeList, getTimeListInterval, syncScroll, toDate } from './helper'
import { renderTable } from './renderer/index'


export default class OhMyGantt {
  element: Element
  data: any[] = [] // 数据
  columns: ColumnItem[] = [] // 要显示的列
  timeColumns: ColumnItem[] = [] // 时间列
  timeList: Array<Date> = [] // 时间列表
  timeListStart: Date = new Date()
  timeListEnd: Date = new Date()

  options: MyGanttOptionsMerge
  $elements: MyGanttElements = {
    leftGrid: null,
    rightGrid: null
  }

  constructor(element: Element | string, options: MyGanttOptions) {
    const defaultOptions: any = {
      timeCellWidth: 120,
      leftWidth: 240,
      timeInterval: 'day'
    }
    const opt: MyGanttOptionsMerge = {
      ...defaultOptions,
      ...options
    }
    this.options = opt
    const $element = typeof element === 'string' ? document.querySelector(element) : element
    if (!$element) {
      throw new Error('Invalid element provided')
    }
    this.element = $element
    this.columns = opt.columns
    this.data = opt.data

    this.timeListStart = toDate(opt.start)
    this.timeListEnd = toDate(opt.end)

    // 初始化日期列表
    const timeListInterval = getTimeListInterval(options.timeInterval)
    this.timeList = getTimeList(opt.start, opt.end, timeListInterval)
    this.render()
  }

  // 渲染
  render() {
    // 创建
    this.element.innerHTML = ''
    const [$leftGrid] = this.renderLeftGrid()
    const [$rightGrid] = this.renderRightGrid()
    this.listenScroll($leftGrid, $rightGrid) // 同步滚动
  }

  /**
   * 渲染左侧表格
   */
  renderLeftGrid(): [HTMLElement, number] {
    const [$leftGrid, dataGridInnerWidth] = renderTable({
      className: 'omg-grid-datagrid',
      columns: this.columns,
      data: this.data,
      options: this.options
    }, this)
    const leftWidth = this.options.leftWidth > dataGridInnerWidth ? dataGridInnerWidth : this.options.leftWidth
    $leftGrid.style.width = `${leftWidth}px`
    this.element.appendChild($leftGrid)
    this.$elements.leftGrid = $leftGrid
    return [$leftGrid, dataGridInnerWidth]
  }

  /**
   * 渲染右侧表格
   */
  renderRightGrid(): [HTMLElement, number] {
    const timeColumns: any[] = []
    for (const date of this.timeList) {
      timeColumns.push({
        label: `${date.getFullYear()}<br/>
          ${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
        width: this.options.timeCellWidth,
        name: date.getTime(),
        sourceData: date
      })
    }
    this.timeColumns = timeColumns

    const [$rightGrid, timeGridInnerWidth] = renderTable({
      className: 'omg-grid-timegrid',
      columns: timeColumns,
      data: this.data,
      options: this.options,
      isTimeGrid: true
    }, this)
    
    this.element.appendChild($rightGrid)
    this.$elements.rightGrid = $rightGrid
    return [$rightGrid, timeGridInnerWidth]
  }
  

  // 监听滚动，使两边同步滚动
  listenScroll(left: HTMLElement, right: HTMLElement) {
    // 左侧滚动
    const leftBdScroll = left.querySelector('.omg-grid__body-wrapper') as HTMLElement
    const rightBdScroll = right.querySelector('.omg-grid__body-wrapper') as HTMLElement

    console.log(leftBdScroll, rightBdScroll)

    if (!leftBdScroll || !rightBdScroll) {
      throw new Error('Invalid element provided')
    }

    syncScroll(leftBdScroll, rightBdScroll)
    syncScroll(rightBdScroll, leftBdScroll)
    // const leftBdScrollTop = leftBdScroll.scrollTop;
  }

  getScrollTop() {
    return this.$elements.leftGrid?.querySelector('.omg-grid__body-wrapper')?.scrollTop || 0
  }
}