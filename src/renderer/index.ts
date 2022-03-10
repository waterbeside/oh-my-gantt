import { computeInnerWidth } from '../utils/helper'
import { renderColgroup } from './colgroup' 
import { renderTableRow } from './tableRow'
import { RenderTableProps, OhMyGantt } from '../../typings/types'


/**
 * 生成表格
 * @param props 
 * @returns 
 */
export function renderTable(props: RenderTableProps, ctx: OhMyGantt): [HTMLElement, number] {
  const isTimeGrid = props.isTimeGrid || false
  const columns = props.columns
  const tableElm = document.createElement('div')  // 最外层的容器
  tableElm.className = 'omg-grid'
  const tableInnerElm = document.createElement('div')  // 内层的容器(为横向滚动的主体)
  tableInnerElm.className = 'omg-grid__inner'

  const tableHeaderWrapperElm = document.createElement('div')  // 表头的容器
  tableHeaderWrapperElm.className = 'omg-grid__header-wrapper'  
  const tableHeaderElm = document.createElement('table')  // 表头
  const tableHeaderTheadElm = document.createElement('thead')  // 表头的thead
  tableHeaderElm.className = 'omg-grid__header'
  
  const tableBodyWrapperElm = document.createElement('div')  // 表格的主体
  tableBodyWrapperElm.className = 'omg-grid__body-wrapper'
  const tableBodyElm = document.createElement('table')  // 表格的主体的内层容器(为纵向滚动的主体)
  tableBodyElm.className = 'omg-grid__body'
  const tableBodyTbodyElm = document.createElement('tbody')  // 表格的主体的tbody


  // 拼接表格
  tableElm.appendChild(tableInnerElm)

  // ---------- 表头
  tableInnerElm.appendChild(tableHeaderWrapperElm) // 表头wrapper
  tableHeaderWrapperElm.appendChild(tableHeaderElm) // 生成表头
  tableHeaderElm.appendChild(renderColgroup({ columns }, ctx))
  tableHeaderElm.appendChild(tableHeaderTheadElm)
  tableHeaderTheadElm.appendChild(renderTableRow({ isHeader: true, columns,  isTimeGrid}, ctx))

  // --------- 表体
  tableInnerElm.appendChild(tableBodyWrapperElm) // 表体wrapper

  tableBodyWrapperElm.appendChild(tableBodyElm)
  tableBodyElm.appendChild(renderColgroup({ columns }, ctx))
  tableBodyElm.appendChild(tableBodyTbodyElm)

  if (props.data && props.data.length > 0) {
    props.data.forEach((item: any, index: number) => {
      tableBodyTbodyElm.appendChild(renderTableRow({ rowData: item, rowIndex: index, columns, isTimeGrid }, ctx))
    })
  }

  // ------- 添加className
  if (props.className) {
    if (typeof props.className === 'string') {
      tableElm.classList.add(props.className)
    }
    if (Array.isArray(props.className)) {
      props.className.forEach((item: string) => {
        tableElm.classList.add(item)
      })
    }
  }
  let innerWidth = 200

  // 设算和设置表体宽
  innerWidth = computeInnerWidth({columns})
  tableInnerElm.style.width = `${innerWidth}px`

  return [tableElm, innerWidth]
}
