/**
 * render Colgroup
 * @param props 
 * @returns 
 */
export function renderColgroup(props: any, ctx: OhMyGantt): HTMLElement {
  const { columns } = props
  const colgroup = document.createElement('colgroup')
  columns.forEach((col: ColumnItem) => {
    const colEl = document.createElement('col') as HTMLElement
    if (col.name) {
      colEl.classList.add(`omg-grid__cell-${col.name}`)
    }
    if (col.width) {
      const width = typeof col.width === 'number' ? `${col.width}px` : col.width
      colEl.style.width = width
    }
    colgroup.appendChild(colEl)
  })
  return colgroup
}