type TimeInterval = 'day' | 'hour' | 'week' | 'month' | 'year' | number
type HandleMouseAction = 'click' | 'mouseover' | 'mouseleave' | 'dragstart' 
type HandleDragAction = 'dragend' | 'drag' | 'dragenter' | 'dragover' | 'dropleave'| 'drop'
type RendererReturnType = DocumentFragment | HTMLElement | string | null

type CssStyle = {
  [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key]
}

interface MyGanttElements {
  dataGrid: HTMLElement | null
  timeGrid: HTMLElement | null
}

interface ColumnItem {
  name: string
  label: string
  width?: number
  sourceData?: any
  render?: (item: any) => HTMLElement
}

interface CellData {
  rowData: any
  $target: HTMLElement
  rowIndex: number
  value: any
  columnIndex: number
  columnName?: string
  [key: string]: any
}

interface TimebarData extends CellData {
  timeColumnsIndex: number[]
  timebarItemData: TimebarSetting
}

interface LabelRendererData {
  columnData: ColumnItem
}

interface GridScrollData {
  datagrid: ScrollData
  timegrid: ScrollData
}
interface ScrollData {
  scrollLeft: number
  scrollTop: number
}

interface TimebarSetting {
  from: Date | string
  to: Date | string
  desc?: string
  color?: string
  __config?: {
    style?: CssStyle
    [key: string]: any
  }
  [key: string]: any
}

interface MyGanttDataItme {
  timebar: TimebarSetting[]
  __config?: {
    height?: number
    [key: string]: any
  }
  [key: string]: any
}

// 醒置项
interface MyGanttOptions {
  startTime: Date | string
  endTime: Date | string
  columns: ColumnItem[]
  dataGridWidth?: number
  timeCellWidth?: number
  timeInterval?: TimeInterval
  timebarGap?: [number, number]
  timebarHeight?: number | null
  timeaBarDraggable?: boolean
  data: MyGanttDataItme[]
  onClickCell?: (data: CellData, e: MouseEvent) => any
  onClickTimebar?: (data: TimebarData, e: MouseEvent) => any
  onMouseoverTimebar?: (data: TimebarData, e: MouseEvent) => any
  onMouseleaveTimebar?: (data: TimebarData, e: MouseEvent) => any
  onDropCell?: (data: CellData, e: MouseEvent) => any
  onDragoverCell?: (data: CellData, e: MouseEvent) => any
  onDragleaveCell?: (data: CellData, e: MouseEvent) => any
  onDragenterCell?: (data: CellData, e: MouseEvent) => any
  onDragstartTimebar?: (data: TimebarData, e: MouseEvent) => any
  onDragendTimebar?: (data: TimebarData, e: MouseEvent) => any
  onDragTimebar?: (data: TimebarData, e: MouseEvent) => any
  onScroll?: (data: GridScrollData, e: Event) => any
  onCreated?: (ctx: OhMyGantt) => any
  onRendered?: (ctx: OhMyGantt) => any
  timebarRenderer?: (data: TimebarData, ctx: OhMyGantt) => RendererReturnType
  timeLabelRenderer?: (data: ColumnItem, columnIndex: number, ctx: OhMyGantt) => RendererReturnType
  timeGridCellRenderer?: (data: CellData, $timebarsElement:DocumentFragment, ctx: OhMyGantt) => RendererReturnType
  [key: string]: any
}

interface MyGanttOptionsMerge extends MyGanttOptions {
  dataGridWidth: number
  timeCellWidth: number
  timeInterval: TimeInterval
  timebarGap: [number, number]
  timebarHeight: number | null
  timeaBarDraggable: boolean
}

// helper - computeTimebar方法的 参数
interface ComputeTimebarProps {
  from: string
  to: string
}

// helper - computeTimebar 方法的返回值
interface ComputeTimebarReturn {
  width: number
  timeColumns: ColumnItem[]
  timeColumnsIndex: number[]
}

// renderer - renderTableCel 参数
interface RenderTableCellProps {
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
interface RenderTableRowProps {
  isHeader?: boolean
  columns: ColumnItem[]
  height?: number
  rowData?: any
  rowIndex?: number | string
  isTimeGrid?: boolean
}

// renderer - renderTimebar 参数
interface RenderTimebarProps {
  width: number
  rowData: any
  rowIndex?: number | string
  timeColumnsIndex: number[]
  timebarIndex: number
  timebarItemData: TimebarSetting
}

// renderer - renderTaber 参数
interface RenderTableProps {
  className?: string | string[]
  isTimeGrid?: boolean
  columns: ColumnItem[]
  data: any[]
  dateList?: Date[]
  options: MyGanttOptions
}

interface SetScrollTopParamsById {
  id: string | number
  index?: number
}

interface SetScrollTopParamsByIndex {
  id?: string | number
  index: number
}

declare class OhMyGantt {
  element: Element
  data: any[]
  columns: ColumnItem[]
  timeColumns: ColumnItem[]
  timeList: Array<Date>
  startTime: Date
  endTime: Date
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
  getRowDataByIndex(index: number): any
  getRowDataById(index: number | string): any
  setMarkLine(markLine: MarkLine): void
  removeMarkLine(markLine: MarkLine): void
  scrollToTime(time: Date | string): void
  setScrollTop(top: number): void
  scrollToRow(params: SetScrollTopParamsById | SetScrollTopParamsByIndex): void
  destroy(): void
  createElement(tag: string, props: any, ...children: any[]): HTMLElement
}


interface OhMarkLineOptions {
  grid?: 'time' | 'data'
  derection?: 'horizontal' | 'vertical'
  time?: Date
  label: string
  color?: string
  lineStyle?: 'solid' | 'dashed' | 'dotted'
  lineWidth?: number
}

interface OhMarkLineOptionsExtendDefault extends OhMarkLineOptions {
  grid: 'time' | 'data'
  derection: 'horizontal' | 'vertical'
}
declare class MarkLine {
  options: OhMarkLineOptionsExtendDefault
  id: string
  $element: HTMLElement
  constructor(options: OhMarkLineOptions)
}