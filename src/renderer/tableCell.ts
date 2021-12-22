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
  if (props.hasTimebar) {
    tableCellElm.classList.add('omg-grid__cell--has-timebar')
  }
  if (props.rowData) {
    tableCellElm.dataset.rowId = props.rowData.id.toString()
  }
  if (typeof props.rowIndex !== 'undefined') {
    tableCellElm.dataset.rowIndex = props.rowIndex.toString()
  }
  const $fragment = document.createDocumentFragment()
  if (props.children) {
    $fragment.appendChild(props.children)
  } else if (typeof props.text !== 'undefined') {
    const cellElm =  document.createElement('div')
    cellElm.className = 'cell'
    cellElm.innerHTML = props.text
    if (props.text !=='') {
      cellElm.setAttribute('title', props.text)
    }
    $fragment.appendChild(cellElm)
  }
  if (props.isTimeGrid && ctx.options.timeGridCellRenderer) {
    const cellData: CellData = {
      rowData: props.rowData,
      $target: tableCellElm,
      rowIndex: Number(props?.rowIndex),
      value: null,
      columnIndex: props.columnIndex
    }
    const $appendElement = ctx.options.timeGridCellRenderer(cellData, $fragment, ctx)
    if ($appendElement && typeof $appendElement === 'object') {
      tableCellElm.appendChild($appendElement as HTMLElement)
    }
  } else {
    tableCellElm.appendChild($fragment)
  }
  return tableCellElm
}