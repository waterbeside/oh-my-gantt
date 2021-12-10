/**
 * 生成表的单元格
 * @param props 
 * @returns HTMLElement
 */
export function renderTableCell(props: RenderTableCellProps, ctx: OhMyGantt) {
  const tableCellElm = document.createElement('td')
  tableCellElm.className = 'omg-grid__cell'
  tableCellElm.dataset.columnIndex = String(props.columnIndex)
  if (props.columnName) {
    tableCellElm.classList.add(`omg-grid__cell-${props.columnName}`)
    tableCellElm.dataset.columnName = props.columnName.toString()
  }
  if (typeof props.rowId !== 'undefined')  {
    tableCellElm.dataset.rowId = props.rowId.toString()
  }
  if (typeof props.rowIndex !== 'undefined') {
    tableCellElm.dataset.rowIndex = props.rowIndex.toString()
  }
  if (props.children) {
    tableCellElm.appendChild(props.children)
  } else if (typeof props.text !== 'undefined') {
    const cellElm =  document.createElement('div')
    cellElm.className = 'cell'
    cellElm.innerHTML = props.text
    tableCellElm.appendChild(cellElm)
  }
  return tableCellElm
}