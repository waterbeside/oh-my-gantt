
import  { OhMyGantt, MarkLine, IUtils  } from './types'

declare const utils: IUtils

export { OhMyGantt }
export { MarkLine }
export { utils }


// declare class OhMyGantt {
//   element: Element
//   data: any[]
//   columns: ColumnItem[]
//   timeColumns: ColumnItem[]
//   timeList: Array<Date>
//   from: Date
//   to: Date
//   options: MyGanttOptionsMerge
//   $elements: MyGanttElements
//   constructor(element: Element | string, options: MyGanttOptions)
//   render(): void
//   /**
//    * 渲染左侧表格
//    */
//   renderDataGrid(): [HTMLElement, number]
//   /**
//    * 渲染右侧表格
//    */
//   renderTimeGrid(): [HTMLElement, number]
//   listenScroll(left: HTMLElement, right: HTMLElement): void
//   getScrollTop(): number
//   _settGridAction(gridElement: HTMLElement): void
//   _handleActionCell(e: MouseEvent, action: HandleMouseAction | HandleDragAction): void
//   _handleActionTimebar(e: MouseEvent, action: HandleMouseAction | HandleDragAction): void
//   _getCellData($target: HTMLElement, isHeader: boolean, isTimeGrid: boolean ): CellData
//   _getTimebarData($target: HTMLElement): TimebarData
//   getRowDataByIndex(index: number): any
//   getRowDataById(index: number | string): any
//   setMarkLine(markLine: MarkLine): void
//   removeMarkLine(markLine: MarkLine): void
//   scrollToTime(time: Date | string): void
//   setScrollTop(top: number): void
//   scrollToRow(params: SetScrollTopParamsById | SetScrollTopParamsByIndex): void
//   destroy(): void
//   createElement(tag: string, props: any, ...children: any[]): HTMLElement
// }

// export declare class MarkLine {
//   options: OhMarkLineOptionsExtendDefault
//   id: string
//   $element: HTMLElement
//   constructor(options: OhMarkLineOptions)
// }

// export declare const utils: IUtils
