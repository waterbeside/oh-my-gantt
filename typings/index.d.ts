declare module 'oh-my-gantt' {
  type TimeInterval = 'day' | 'hour' | 'week' | 'month' | 'year' | number
  type HandleMouseAction = 'click' | 'mouseover' | 'mouseleave' | 'dragstart' 
  type HandleDragAction = 'dragend' | 'drag' | 'dragenter' | 'dragover' | 'dropleave'| 'drop'
  type RendererReturnType = DocumentFragment | HTMLElement | string | null
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
    columnIndex: number
    rowId?: string
    columnName?: string
    [key: string]: any
  }

  interface TimeBarData extends CellData {
    timeColumnsIndex: number[]
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


  // 醒置项
  interface MyGanttOptions {
    start: Date | string
    end: Date | string
    columns: ColumnItem[]
    timeCellWidth?: number
    timeInterval?: TimeInterval
    timeBarGap?: [number, number]
    timeBarHeight?: number | null
    timeaBarDraggable?: boolean
    onClickCell?: (data: CellData, e: MouseEvent) => any
    onClickTimeBar?: (data: TimeBarData, e: MouseEvent) => any
    onMouseoverTimeBar?: (data: TimeBarData, e: MouseEvent) => any
    onMouseleaveTimeBar?: (data: TimeBarData, e: MouseEvent) => any
    onDropCell?: (data: CellData, e: MouseEvent) => any
    onDragoverCell?: (data: CellData, e: MouseEvent) => any
    onDragleaveCell?: (data: CellData, e: MouseEvent) => any
    onDragenterCell?: (data: CellData, e: MouseEvent) => any
    onDragstartTimeBar?: (data: TimeBarData, e: MouseEvent) => any
    onDragendTimeBar?: (data: TimeBarData, e: MouseEvent) => any
    onDragTimeBar?: (data: TimeBarData, e: MouseEvent) => any
    onScroll?: (data: GridScrollData, e: Event) => any
    timeBarRenderer?: (data: TimeBarData, ctx: OhMyGantt) => RendererReturnType
    timeLabelRenderer?: (data: ColumnItem, columnIndex: number, ctx: OhMyGantt) => RendererReturnType
    [key: string]: any
  }

  interface MyGanttOptionsMerge extends MyGanttOptions {
    timeCellWidth: number
    timeInterval: TimeInterval
    timeBarGap: [number, number]
    timeBarHeight: number | null
    timeaBarDraggable: boolean
  }

  // helper - computeTimeBar方法的 参数
  interface ComputeTimeBarProps {
    startTime: string
    endTime: string
  }

  // helper - computeTimeBar 方法的返回值
  interface ComputeTimeBarReturn {
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
    rowId?: number | string
    columnIndex: number
  }

  // renderer - renderTableRow 参数
  interface RenderTableRowProps {
    isHeader?: boolean
    columns: ColumnItem[]
    height?: number
    rowData?: any
    rowIndex?: number | string
    rowId?: number | string
    isTimeGrid?: boolean
  }

  // renderer - renderTimeBar 参数
  interface RenderTimeBarProps {
    width: number
    rowData: any
    rowIndex?: number | string
    rowId?: number | string
    timeColumnsIndex: number[]
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

  export default class OhMyGantt {
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
    _getCellData($target: HTMLElement, isHeader: boolean, isTimeGrid: boolean ): CellData
    _getTimeBarData($target: HTMLElement): TimeBarData
    getRowDataByIndex(index: number): any
    createElement(tag: string, props: any, ...children: any[]): HTMLElement
  }
}
