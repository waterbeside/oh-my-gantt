/**
 * 生成表的单元格
 * @param props 
 * @returns HTMLElement
 */
export function renderTableCell(props: any, ctx: OhMyGantt) {
  const tableCellElm = document.createElement('td')
  tableCellElm.className = 'omg-grid__cell'
  if (props.columnName) {
    tableCellElm.classList.add(`omg-grid__cell-${props.columnName}`)
  }
  if (props.children) {
    tableCellElm.innerHTML = ''
    console.log('props.children', props.children)
    tableCellElm.appendChild(props.children)
  } else if (props.text) {
    tableCellElm.innerHTML = props.text
  }
  return tableCellElm
}