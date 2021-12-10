
import { syncScroll, computeTimeColumnLabel, createElement } from './utils/helper'
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
      timeBarDraggable: false,
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
    this._settGridAction($leftGrid, false)
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
    this._settGridAction($rightGrid, true)
    return [$rightGrid, timeGridInnerWidth]
  }
  

  // 监听滚动，使两边同步滚动
  listenScroll(left: HTMLElement, right: HTMLElement) {
    // 左侧滚动
    const leftBdScroll = left.querySelector('.omg-grid__body-wrapper') as HTMLElement
    const rightBdScroll = right.querySelector('.omg-grid__body-wrapper') as HTMLElement

    if (!leftBdScroll || !rightBdScroll) {
      throw new Error('Invalid element provided')
    }

    syncScroll(leftBdScroll, rightBdScroll)
  }

  getScrollTop() {
    return this.$elements.leftGrid?.querySelector('.omg-grid__body-wrapper')?.scrollTop || 0
  }

  _settGridAction($gridElm: HTMLElement, isTimeGrid = false) {
    // 当允许拖拽时，添加拖拽相关事件
    if (this.options.timeBarDraggable && isTimeGrid) {
      const dropCellActionNames = ['drop', 'dragover', 'dragleave', 'dragenter']
      dropCellActionNames.forEach(actionName => {
        $gridElm.addEventListener(actionName, (e: Event) => {
          this._handleActionCell(e, actionName as any, isTimeGrid)
        })
      });
      const dragTimeBarActionNames = ['dragstart', 'dragend', 'drag']
      dragTimeBarActionNames.forEach(actionName => {
        $gridElm.addEventListener(actionName, (e: Event) => {
          this._handleActionTimeBar(e, actionName as any)
        })
      });
    }

    $gridElm.addEventListener('click', (e: MouseEvent) => {
      if (isTimeGrid && this._handleActionTimeBar(e, 'click')) {
        return
      }
      this._handleActionCell(e, 'click', isTimeGrid)
    })
    $gridElm.addEventListener('mouseover', (e: MouseEvent) => {
      if (isTimeGrid && this._handleActionTimeBar(e, 'mouseover')) {
        return
      } 
      this._handleActionCell(e, 'mouseover', isTimeGrid)
    })
  }

  _handleActionCell(e: Event, action: HandleMouseAction | HandleDragAction= 'click', isTimeGrid = false) {
    const target = e.target as HTMLElement
    const actionFunNames: any = {
      click: 'onClickCell',
      mouseover: 'onMouseoverCell',
      mouseleave: 'onMouseleaveCell',
      drop: 'onDropCell',
      dragover: 'onDragoverCell',
      dragleave: 'onDragleaveCell',
      dragenter: 'onDragenterCell'

    }
    // 点击单元格
    const $target = target.closest('.omg-grid__cell') as HTMLElement
    if ($target && actionFunNames[action] && typeof this.options[actionFunNames[action]] !== 'undefined') {
      const cellData = this._getCellData($target, isTimeGrid)
      const res = this.options[actionFunNames[action]](cellData, e)
      return res
    }
  }

  _handleActionTimeBar(e: Event, action: HandleMouseAction | HandleDragAction = 'click') {
    const target = e.target as HTMLElement
    const actionFunNames: any = {
      click: 'onClickTimeBar',
      mouseover: 'onMouseoverTimeBar',
      mouseleave: 'onMouseleaveTimeBar',
      dragstart: 'onDragstartTimeBar',
      dragend: 'onDragendTimeBar',
      drag: 'onDragTimeBar'
    }
    // 点击单元格
    const $target = target.closest('.omg-grid__time-bar') as HTMLElement
    if ($target) {
      const $cellTarget = $target.closest('.omg-grid__cell')
      if ($cellTarget && actionFunNames[action] && typeof this.options[actionFunNames[action]] !== 'undefined') {
        const timeBarData: TimeBarData = this._getTimeBarData($target)
        const res = this.options[actionFunNames[action]](timeBarData, e)
        return res
      }
    }
    
  }

  _getCellData($target: HTMLElement, isTimeGrid = false,): CellData {
    const rowIndex = Number($target.dataset.rowIndex)
    const columnName = $target.dataset.columnName
    const columnIndex = Number($target.dataset.columnIndex)
    const rowId = $target.dataset?.rowId
    const rowData = this.getRowDataByIndex(rowIndex)
    const rowHeaderElm = $target.closest('.omg-grid__row--header')
    let value = rowData && columnName && typeof rowData[columnName] !== 'undefined' ? rowData[columnName] : ''
    if (isTimeGrid && rowHeaderElm) {
      value = this.timeList[columnIndex] || null
    }
    return {
      rowData,
      rowIndex,
      $target,
      columnName,
      columnIndex,
      rowId,
      value
    }
  }

  _getTimeBarData($target: HTMLElement): TimeBarData {
    const $cellTarget = $target.closest('.omg-grid__cell') as HTMLElement
    const cellData = this._getCellData($cellTarget, true)
    const timeBarData: TimeBarData = {
      ...cellData,
      $target,
      timeColumnsIndex: $target.dataset.timeColumnsIndex?.split(',').map(Number) || []
    }
    return timeBarData
  }

  getRowDataByIndex(index: number) {
    if (Number.isNaN(index)) {
      return null
    }
    return this.data[index]
  }

  createElement = createElement
}