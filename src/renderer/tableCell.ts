/**
 * 生成表的单元格
 * @param props 
 * @returns HTMLElement
 */
export function renderTableCell(props: RenderTableCellProps, ctx: OhMyGantt) {
  const tableCellElm = document.createElement('td')
  tableCellElm.className = 'omg-grid__cell'
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
    tableCellElm.innerHTML = ''
    tableCellElm.appendChild(props.children)
  } else if (typeof props.text !== 'undefined') {
    tableCellElm.innerHTML = props.text
  }
  return tableCellElm
}