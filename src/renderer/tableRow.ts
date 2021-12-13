import { renderTableCell } from './tableCell'
import { renderTimebar } from './timebar'
import { computeTimebar } from '../utils/helper'
import { toDate, getTimeIntervarFormatter, dateFormat } from '../utils/dateHelper'

/**
 * 生成表行
 * @param props 
 * @returns HTMLElement
 */
export function renderTableRow(props: RenderTableRowProps, ctx: OhMyGantt): HTMLElement {
  const isTimeGrid = props.isTimeGrid || false
  const tableRowElm = document.createElement('tr')
  tableRowElm.className = 'omg-grid__row'
  if (props.isHeader) {
    tableRowElm.classList.add('omg-grid__row--header')
  }
  // 如果设了高度
  if (props.height) {
    if (typeof props.height === 'number') {
      tableRowElm.style.height = `${props.height}px`
    } else {
      tableRowElm.style.height = `${props.height}`
    }
  }
  // 设置列
  if (props.columns && props.columns.length > 0) {
    if (props.isHeader) { // 如果是表头
      const headerfragment = renderHeaderRow(props, ctx)
      tableRowElm.appendChild(headerfragment)
    } else if (props.rowData) {
      if (typeof props.rowIndex !== 'undefined')  {
        tableRowElm.dataset.rowIndex = props.rowIndex.toString()
      }
      if (typeof props.rowData.id !== 'undefined')  {
        tableRowElm.dataset.rowId = props.rowData.id.toString()
      }
      const bodyfragment = isTimeGrid ? renderTimeGridBodyRow(props, ctx) : renderBodyRow(props, ctx)
      tableRowElm.appendChild(bodyfragment)
    }
  }
  return tableRowElm
}

/**
 * 生成表头行的所有列
 * @param props 
 * @param ctx 
 * @returns 
 */
export function renderHeaderRow(props: RenderTableRowProps, ctx: OhMyGantt): DocumentFragment {
  const isTimeGrid = props.isTimeGrid || false
  const options = ctx.options
  const fragment = document.createDocumentFragment()
  props.columns.forEach((column: ColumnItem, index: number) => {
    const cellProps: any = { columnName: column.name, columnIndex: index }
    if (isTimeGrid && options?.timeLabelRenderer) { // 如果是时间表格 并需要重新染染内容的
      cellProps.children =  options.timeLabelRenderer(column, index, ctx)
    } else {
      cellProps.text = column.label
    }
    fragment.appendChild(renderTableCell(cellProps, ctx))
  })
  return fragment
}

export function renderBodyRow(props: RenderTableRowProps, ctx: OhMyGantt): DocumentFragment {
  const fragment = document.createDocumentFragment()
  const rowData = props.rowData
  props.columns.forEach((column: ColumnItem, index: number) => {
    const cellProps: any = { columnName: column.name, columnIndex: index }
    cellProps.text = rowData[column.name]
    if (typeof props.rowIndex !== 'undefined') {
      cellProps.rowIndex = props.rowIndex
    }
    if (typeof props.rowId !== 'undefined') {
      cellProps.rowId = props.rowId
    }
    fragment.appendChild(renderTableCell(cellProps, ctx))
  })
  return fragment
}

export function renderTimeGridBodyRow(props: RenderTableRowProps, ctx: OhMyGantt): DocumentFragment {
  const options = ctx.options
  const fragment = document.createDocumentFragment()
  const rowData = props.rowData


  let timeIntervalFormatter = 'YYYY-MM-DD HH:mm:ss'
  if (typeof options.timeInterval === 'string') {
    timeIntervalFormatter = getTimeIntervarFormatter(ctx.options.timeInterval, true)
  }
  const timebarSettings = rowData.timebar || []
  console.log('timebarSettings', timebarSettings)

  props.columns.forEach((column: any, index: number) => {
    const cellProps: any = { columnName: column.name, columnIndex: index }
    if (typeof props.rowIndex !== 'undefined') {
      cellProps.rowIndex = props.rowIndex
    }
    timebarSettings.forEach((timebarSetting: any, timebarSettingIndex: number) => {
      const startTimeStamp = toDate(dateFormat(timebarSetting.from, timeIntervalFormatter)).getTime()
      if (startTimeStamp === column.name) {
        const timebarData = computeTimebar({from: timebarSetting.from, to: timebarSetting.to}, ctx)

        const timebarProps = {
          width: timebarData.width - options.timebarGap[1] * 2,
          rowData,
          timeColumnsIndex: timebarData.timeColumnsIndex,
          timebarIndex: timebarSettingIndex,
          timebarItemData: timebarSetting
        }
        cellProps.children =  renderTimebar(timebarProps, ctx)   
      }
    })
    // if (column.name === startTimeStamp) {
    //   const timebarProps = {
    //     width: timebarData.width - options.timebarGap[1] * 2,
    //     rowData,
    //     timeColumnsIndex: timebarData.timeColumnsIndex
    //   }
    //   cellProps.children =  renderTimebar(timebarProps, ctx)      
    // }
    fragment.appendChild(renderTableCell(cellProps, ctx))
  })
  return fragment
}