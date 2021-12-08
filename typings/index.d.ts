
type TimeInterval = 'day' | 'hour' | 'week' | 'month'  | number


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


interface MyGanttOptions {
  start: Date | string
  end: Date | string
  columns: ColumnItem[]
  timeCellWidth?: number
  timeInterval?: TimeInterval
  dateTableHeaderRender?: (date: Date) => HTMLElement
  [key: string]: any
}

interface MyGanttOptionsMerge {
  start: Date | string
  end: Date | string
  columns: ColumnItem[]
  timeCellWidth: number
  timeInterval: TimeInterval
  dateTableHeaderRender?: (date: Date) => HTMLElement
  [key: string]: any
}

interface ComputeTimeBarWidthProps {
  startTime: string
  endTime: string
}

interface ComputeTimeBarWidthReturn {
  width: number
  timeColumns: ColumnItem[]
  timeColumnsIndex: number[]
  debug?: any
}

interface RenderTableRowProps {
  isHeader?: boolean
  columns: ColumnItem[]
  height?: number
  rowData?: any
  options?: MyGanttOptions
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
}