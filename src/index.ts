
import { syncScroll, computeTimeColumnLabel } from './utils/helper'
import { toDate, getTimeList } from './utils/dateHelper'
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
      timeInterval: 'day',
      timeBarGap: [4, 4],
      timeBarHeight: 20,
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
    this.timeList = getTimeList(opt.start, opt.end, options.timeInterval)
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
        label: computeTimeColumnLabel(date, this),
        width: this.options.timeCellWidth,
        name: date.getTime(),
        sourceData: date
      })
    }
    console.log('timeColumns', timeColumns)
    console.log('this.timeList', this.timeList)
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
    this._settGridAction($rightGrid)
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

  _settGridAction($gridElm: HTMLElement) {
    $gridElm.addEventListener('click', (e: MouseEvent) => {
      if(this._handleActionTimeBar(e, 'click')) {
        return
      }
      this._handleActionCell(e, 'click')
    })
    $gridElm.addEventListener('mouseover', (e: MouseEvent) => {
      if(this._handleActionTimeBar(e, 'mouseover')) {
        this._handleActionTimeBar(e, 'mouseover')
      }
    })
  }

  _handleActionCell(e: MouseEvent, action: HandleMouseAction = 'click') {
    const target = e.target as HTMLElement
    const actionFunNames = {
      click: 'onClickCell',
      mouseover: 'onMouseoverCell',
      mouseleave: 'onMouseleaveCell'
    }
    // 点击单元格
    const $target = target.closest('.omg-grid__cell') as HTMLElement
    if ($target && typeof this.options[actionFunNames[action]] !== 'undefined') {
      const cellData = this._getCellData($target)
      const res = this.options[actionFunNames[action]](cellData, e)
      return res
    }
  }

  _handleActionTimeBar(e: MouseEvent, action: HandleMouseAction = 'click') {
    const target = e.target as HTMLElement
    const actionFunNames = {
      click: 'onClickTimeBar',
      mouseover: 'onMouseoverTimeBar',
      mouseleave: 'onMouseleaveTimeBar'
    }
    // 点击单元格
    const $target = target.closest('.omg-grid__time-bar') as HTMLElement
    if ($target) {
      const $cellTarget = $target.closest('.omg-grid__cell')
      if ($cellTarget && typeof this.options[actionFunNames[action]] !== 'undefined') {
        const timeBarData: TimeBarData = this._getTimeBarData($target)
        const res = this.options[actionFunNames[action]](timeBarData, e)
        return res
      }
    }
    
  }

  _getCellData($target: HTMLElement): CellData {
    const rowIndex = Number($target.dataset.rowIndex)
    const columnName = $target.dataset.columnName
    
    const rowId = $target.dataset?.rowId
    const rowData = this.getRowDataByIndex(rowIndex)
    const value = columnName && typeof rowData[columnName] !== 'undefined' ? rowData[columnName] : ''
    return {
      rowData,
      rowIndex,
      $target,
      columnName,
      rowId,
      value
    }
  }

  _getTimeBarData($target: HTMLElement): TimeBarData {
    const $cellTarget = $target.closest('.omg-grid__cell') as HTMLElement
    const cellData = this._getCellData($cellTarget)
    const timeBarData: TimeBarData = {
      ...cellData,
      timeColumnsIndex: $target.dataset.timeColumnsIndex?.split(',').map(Number) || []
    }
    return timeBarData
  }

  getRowDataByIndex(index: number) {
    return this.data[index]
  }
}