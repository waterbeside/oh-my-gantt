import { renderTableCell } from './tableCell'
import { renderTimeBar } from './timeBar'
import { computeTimeBar } from '../helper'
import { toDate } from '../helper'

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
      const headerfragment = isTimeGrid ? renderTimeGridBodyRow(props, ctx) : renderBodyRow(props, ctx)
      tableRowElm.appendChild(headerfragment)
      if (typeof props.rowIndex !== 'undefined')  {
        tableRowElm.dataset.rowIndex = props.rowIndex.toString()
      }
      if (typeof props.rowData.id !== 'undefined')  {
        tableRowElm.dataset.rowId = props.rowData.id.toString()
      }
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
  props.columns.forEach((column: any) => {
    const cellProps: any = { columnName: column.name }
    if (isTimeGrid && options?.dateTableHeaderRender) { // 如果是时间表格
      cellProps.children =  options.dateTableHeaderRender(column.sourceData)
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
  props.columns.forEach((column: any) => {
    const cellProps: any = { columnName: column.name }
    cellProps.text = rowData[column.name]
    if (typeof props.rowIndex !== 'undefined') {
      cellProps.rowIndex = props.rowIndex
    }
    fragment.appendChild(renderTableCell(cellProps, ctx))
  })
  return fragment
}


export function renderTimeGridBodyRow(props: RenderTableRowProps, ctx: OhMyGantt): DocumentFragment {
  const options = ctx.options
  const fragment = document.createDocumentFragment()
  const rowData = props.rowData

  const timeBarData = computeTimeBar({startTime: rowData.startTime, endTime: rowData.endTime}, ctx)
  const startTimeStamp = toDate(rowData.startTime).getTime()
  props.columns.forEach((column: any) => {
    const cellProps: any = { columnName: column.name }
    if (typeof props.rowIndex !== 'undefined') {
      cellProps.rowIndex = props.rowIndex
    }
    if (column.name === startTimeStamp) {
      const timeBarProps = {
        width: timeBarData.width - options.timeBarGap[1] * 2,
      }
      cellProps.children =  renderTimeBar(timeBarProps, ctx)
      cellProps.children.dataset.timeColumnsIndex = timeBarData.timeColumnsIndex.join(',')
      
    }
    
    fragment.appendChild(renderTableCell(cellProps, ctx))
  })
  return fragment
}