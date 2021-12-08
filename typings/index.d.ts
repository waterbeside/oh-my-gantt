type TimeInterval = 'day' | 'hour' | 'week' | 'month'  | number
type HandleMouseAction = 'click' | 'mouseover' | 'mouseleave'

interface MyGanttElements {
  leftGrid: HTMLElement | null
  rightGrid: HTMLElement | null
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
  rowId?: string
  columnName?: string
  [key: string]: any
}

interface TimeBarData extends CellData {
  timeColumnsIndex: number[]
}

interface MyGanttOptions {
  start: Date | string
  end: Date | string
  columns: ColumnItem[]
  timeCellWidth?: number
  timeInterval?: TimeInterval
  timeBarGap?: [number, number]
  timeBarHeight?: number | null
  dateTableHeaderRender?: (date: Date) => HTMLElement
  onClickCell?: (data: CellData, e: MouseEvent) => any
  onClickTimeBar?: (data: TimeBarData, e: MouseEvent) => any
  onMouseoverTimeBar?: (data: TimeBarData, e: MouseEvent) => any
  onMouseleaveTimeBar?: (data: TimeBarData, e: MouseEvent) => any
  [key: string]: any
}

interface MyGanttOptionsMerge extends MyGanttOptions {
  timeCellWidth: number
  timeInterval: TimeInterval
  timeBarGap: [number, number]
  timeBarHeight: number | null
}

interface ComputeTimeBarWidthProps {
  startTime: string
  endTime: string
}

// computeTimeBarWidth
interface ComputeTimeBarReturn {
  width: number
  timeColumns: ColumnItem[]
  timeColumnsIndex: number[]
  debug?: any
}

interface RenderTableCellProps {
  columnName?: string
  children?: HTMLElement
  text?: string
  rowData?: any
  rowIndex?: number | string
  rowId?: number | string
}

interface RenderTableRowProps {
  isHeader?: boolean
  columns: ColumnItem[]
  height?: number
  rowData?: any
  rowIndex?: number | string
  isTimeGrid?: boolean
}


interface RenderTableProps {
  className?: string | string[]
  isTimeGrid?: boolean
  columns: ColumnItem[]
  data: any[]
  dateList?: Date[]
  options: MyGanttOptions
}

declare class OhMyGantt {
  element: Element
  data: any[]
  columns: ColumnItem[]
  timeColumns: ColumnItem[]
  timeList: Array<Date>
  timeListStart: Date
  timeListEnd: Date
  options: MyGanttOptionsMerge
  $elements: MyGanttElements
  constructor(element: Element | string, options: MyGanttOptions);
  render(): void;
  /**
   * 渲染左侧表格
   */
  renderLeftGrid(): [HTMLElement, number];
  /**
   * 渲染右侧表格
   */
  renderRightGrid(): [HTMLElement, number];
  listenScroll(left: HTMLElement, right: HTMLElement): void;
  getScrollTop(): number;
  _settGridAction(gridElement: HTMLElement): void;
  _handleActionCell(e: MouseEvent, action: HandleMouseAction): void;
  _handleActionTimeBar(e: MouseEvent, action: HandleMouseAction): void;
  _getCellData($target: HTMLElement): CellData
  getRowDataByIndex(index: number): any
}