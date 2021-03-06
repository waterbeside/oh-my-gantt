export type TimeInterval = 'day' | 'hour' | 'week' | 'month' | 'year' | number
export type HandleMouseAction = 'click' | 'mouseover' | 'mouseleave' | 'dragstart' 
export type HandleDragAction = 'dragend' | 'drag' | 'dragenter' | 'dragover' | 'dropleave'| 'drop'
export type RendererReturnType = DocumentFragment | HTMLElement | string | null

export type CssStyle = {
  [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key]
}

export interface MyGanttElements {
  dataGrid: HTMLElement | null
  timeGrid: HTMLElement | null
}

export interface ColumnItem {
  name: string
  label: string
  width?: number
  sourceData?: any
  // render?: (item: any) => HTMLElement
}

export interface CellData {
  rowData: any
  $target: HTMLElement
  rowIndex: number
  value: any
  columnIndex: number
  columnName?: string
  [key: string]: any
}

export interface TimebarData extends CellData {
  timeColumnsIndex: number[]
  timebarItemData: TimebarSetting
}

export interface LabelRendererData {
  columnData: ColumnItem
}

export interface GridScrollData {
  datagrid: ScrollData
  timegrid: ScrollData
}

export interface ScrollData {
  scrollLeft: number
  scrollTop: number
}

export interface TimebarSetting {
  from: Date | string
  to: Date | string
  desc?: string
  __config?: {
    style?: CssStyle
    [key: string]: any
  }
  [key: string]: any
}

export interface MyGanttDataItem {
  timebar: TimebarSetting[]
  __config?: {
    height?: number
    [key: string]: any
  }
  [key: string]: any
}

// 醒置项
export interface MyGanttOptions {
  startTime?: Date | string
  endTime?: Date | string
  from?: Date | string
  to?: Date | string
  columns: ColumnItem[]
  dataGridWidth?: number
  timeCellWidth?: number
  timeInterval?: TimeInterval
  timebarGap?: [number, number]
  timebarHeight?: number | null
  timebarDraggable?: boolean
  data: MyGanttDataItem[]
  timebarRenderer?: (data: TimebarData, ctx: OhMyGantt) => RendererReturnType
  timeGridCellRenderer?: (data: CellData, $timebarsElement:DocumentFragment, ctx: OhMyGantt) => RendererReturnType
  timeLabelRenderer?: (data: ColumnItem, columnIndex: number, ctx: OhMyGantt) => RendererReturnType
  onClickTimebar?: (data: TimebarData, e: MouseEvent) => any
  onMouseoverTimebar?: (data: TimebarData, e: MouseEvent) => any
  onMouseleaveTimebar?: (data: TimebarData, e: MouseEvent) => any
  onDragTimebar?: (data: TimebarData, e: MouseEvent) => any
  onDragstartTimebar?: (data: TimebarData, e: MouseEvent) => any
  onDragendTimebar?: (data: TimebarData, e: MouseEvent) => any
  onClickCell?: (data: CellData, e: MouseEvent) => any
  onDropCell?: (data: CellData, e: MouseEvent) => any
  onDragoverCell?: (data: CellData, e: MouseEvent) => any
  onDragenterCell?: (data: CellData, e: MouseEvent) => any
  onDragleaveCell?: (data: CellData, e: MouseEvent) => any
  onScroll?: (data: GridScrollData, e: Event) => any
  onCreated?: (ctx: OhMyGantt) => any
  onRendered?: (ctx: OhMyGantt) => any
  [key: string]: any
}

export interface MyGanttOptionsMerge extends MyGanttOptions {
  from: Date | string
  to: Date | string
  dataGridWidth: number
  timeCellWidth: number
  timeInterval: TimeInterval
  timebarGap: [number, number]
  timebarHeight: number | null
  timeaBarDraggable: boolean
}

// helper - computeTimebar方法的 参数
export interface ComputeTimebarProps {
  from: string
  to: string
}

// helper - computeTimebar 方法的返回值
export interface ComputeTimebarReturn {
  width: number
  timeColumns: ColumnItem[]
  timeColumnsIndex: number[]
}

// renderer - renderTableCel 参数
export interface RenderTableCellProps {
  columnName?: string
  children?: HTMLElement
  text?: string
  rowData?: any
  rowIndex?: number | string
  hasTimebar?: boolean
  columnIndex: number
  isTimeGrid: boolean
}

// renderer - renderTableRow 参数
export interface RenderTableRowProps {
  isHeader?: boolean
  columns: ColumnItem[]
  height?: number
  rowData?: any
  rowIndex?: number | string
  isTimeGrid?: boolean
}

// renderer - renderTimebar 参数
export interface RenderTimebarProps {
  width: number
  rowData: any
  rowIndex?: number | string
  timeColumnsIndex: number[]
  timebarIndex: number
  timebarItemData: TimebarSetting
}

// renderer - renderTaber 参数
export interface RenderTableProps {
  className?: string | string[]
  isTimeGrid?: boolean
  columns: ColumnItem[]
  data: any[]
  dateList?: Date[]
  options: MyGanttOptions
}

export interface SetScrollTopParamsById {
  id: string | number
  index?: number
}

export interface SetScrollTopParamsByIndex {
  id?: string | number
  index: number
}

export declare class OhMyGantt {
  element: Element
  data: MyGanttDataItem[]
  columns: ColumnItem[]
  timeColumns: ColumnItem[]
  timeList: Array<Date>
  from: Date
  to: Date
  options: MyGanttOptionsMerge
  $elements: MyGanttElements
  constructor(element: Element | string, options: MyGanttOptions)
  render(): void
  /**
   * 渲染左侧表格
   */
  renderDataGrid(): [HTMLElement, number]
  /**
   * 渲染右侧表格
   */
  renderTimeGrid(): [HTMLElement, number]
  listenScroll(left: HTMLElement, right: HTMLElement): void
  getScrollTop(): number
  _settGridAction(gridElement: HTMLElement): void
  _handleActionCell(e: MouseEvent, action: HandleMouseAction | HandleDragAction): void
  _handleActionTimebar(e: MouseEvent, action: HandleMouseAction | HandleDragAction): void
  _getCellData($target: HTMLElement, isHeader: boolean, isTimeGrid: boolean ): CellData
  _getTimebarData($target: HTMLElement): TimebarData
  getRowDataByIndex(index: number): MyGanttDataItem | null
  getRowDataById(index: number | string): MyGanttDataItem | null
  setMarkLine(markLine: MarkLine): void
  removeMarkLine(markLine: MarkLine): void
  scrollToTime(time: Date | string): void
  setScrollTop(top: number): void
  scrollToRow(params: SetScrollTopParamsById | SetScrollTopParamsByIndex): void
  destroy(): void
  createElement(tag: string, props: any, ...children: any[]): HTMLElement
}

export interface OhMarkLineOptions {
  grid?: 'time' | 'data'
  derection?: 'horizontal' | 'vertical'
  time?: Date | string
  label: string
  color?: string
  lineStyle?: 'solid' | 'dashed' | 'dotted'
  lineWidth?: number
}

export interface OhMarkLineOptionsExtendDefault extends OhMarkLineOptions {
  grid: 'time' | 'data'
  derection: 'horizontal' | 'vertical'
}

export declare class MarkLine {
  options: OhMarkLineOptionsExtendDefault
  id: string
  color?: string
  $element: HTMLElement
  constructor(options: OhMarkLineOptions)
}

export interface IUtils {
  createElement: (tag: string, props: any, ...children: any[]) => HTMLElement
  createIdent: (row: any) => string
  toDate: (date: Date | string) => Date
  dateFormat: (date: Date | string, format?: string) => string
  createTimeList: (start: Date | string, end: Date | string, timeInterval: TimeInterval) => Array<Date>
}



